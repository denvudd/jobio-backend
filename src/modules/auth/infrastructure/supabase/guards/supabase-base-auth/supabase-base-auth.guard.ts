import { ExecutionContext, Inject, Type, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { AuthApiError } from '@supabase/supabase-js';
import { Request } from 'express';

import { AppException } from '~core/exceptions/domain/exceptions/base/app.exception';

import { AuthException } from '~modules/auth/application/exceptions/auth.exception';
import { InvalidAccessTokenException } from '~modules/auth/application/exceptions/invalid-access-token.exception';
import { InvalidAuthResultException } from '~modules/auth/application/exceptions/invalid-auth-result.exception';
import { NoTokenProvidedException } from '~modules/auth/application/exceptions/no-token-provided.exception';
import { AuthMetadataKey } from '~modules/auth/constants';
import { SupabaseAccessTokenJwtPayloadMapper } from '~modules/auth/infrastructure/supabase/mappers/access-token-jwt-payload/supabase-access-token-jwt-payload.mapper';
import { SupabaseSessionMapper } from '~modules/auth/infrastructure/supabase/mappers/session/supabase-session.mapper';
import { SupabaseUserMapper } from '~modules/auth/infrastructure/supabase/mappers/user/supabase-user.mapper';
import { SupabaseAuthenticatedClientService } from '~modules/auth/infrastructure/supabase/services/supabase-authenticated-client/supabase-authenticated-client.service';

import { IAuthResult } from 'src/lib/passport-supabase';

export const SupabaseBaseAuthGuard = (type?: string | string[]): Type<IAuthGuard> => {
  class MixinAuthGuard extends AuthGuard(type) {
    @Inject(SupabaseUserMapper) private readonly supabaseUserMapper: SupabaseUserMapper;
    @Inject(SupabaseSessionMapper) private readonly supabaseSessionMapper: SupabaseSessionMapper;
    @Inject(SupabaseAccessTokenJwtPayloadMapper)
    private readonly supabaseAccessTokenJwtPayloadMapper: SupabaseAccessTokenJwtPayloadMapper;
    @Inject(SupabaseAuthenticatedClientService)
    private readonly supabaseAuthenticatedClientService: SupabaseAuthenticatedClientService;
    @Inject(Reflector) private readonly reflector: Reflector;

    handleRequest<TUser = any>(error: unknown, user: any, info: AuthApiError, context: ExecutionContext): TUser {
      if (error && error instanceof AppException) throw error;
      if (error) throw new InvalidAccessTokenException(error);
      if (info) {
        throw new AuthException(info.message, info);
      }
      if (!user) {
        throw new NoTokenProvidedException();
      }

      const isAuthenticateSupabaseClient = this.reflector.getAllAndOverride<boolean>(
        AuthMetadataKey.AUTHENTICATE_SUPABASE_CLIENT,
        [context.getHandler(), context.getClass()],
      );

      try {
        this.assertIsAuthResult(user);
      } catch (err) {
        throw new InvalidAuthResultException(err);
      }

      const domainSession = user.session ? this.supabaseSessionMapper.toDomain(user.session) : null;
      let domainUser = null;
      if (user.user) {
        domainUser = this.supabaseUserMapper.toDomain(user.user);
      } else if (user.accessTokenPayload) {
        domainUser = this.supabaseAccessTokenJwtPayloadMapper.toDomain(user.accessTokenPayload);
      }

      const request: Request = this.getRequest(context);

      request.session = domainSession;

      request.client = user.authorizedClient;
      // client is already authenticated, so we don't waste time authenticating it again
      if (user.authorizedClient) {
        this.supabaseAuthenticatedClientService.setAuthenticatedClient(user.authorizedClient);
        return domainUser as TUser;
      }

      // authenticate client on demand
      if (domainSession && isAuthenticateSupabaseClient) {
        return this.supabaseAuthenticatedClientService
          .authenticateWithSession(domainSession)
          .then(() => domainUser) as TUser;
      }

      if (request.accessToken && isAuthenticateSupabaseClient) {
        return this.supabaseAuthenticatedClientService
          .authenticateWithAccessToken(request.accessToken)
          .then(() => domainUser) as TUser;
      }
      return domainUser as TUser;
    }

    private assertIsAuthResult(authResult: unknown): asserts authResult is IAuthResult {
      if (typeof authResult !== 'object' || !('session' in authResult) || !('user' in authResult)) {
        throw new Error('Invalid auth result');
      }
    }
  }

  return mixin(MixinAuthGuard);
};
