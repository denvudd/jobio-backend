import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';

import { AuthGuardToken } from '~modules/auth/constants';

import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

import { IAuthResult } from 'src/lib/passport-supabase';

import { SupabaseAccessTokenJwtPayload } from '../../mappers/access-token-jwt-payload/supabase-access-token-jwt-payload.mapper';

@Injectable()
export class SupabaseJwtAccessAuthStrategy extends PassportStrategy(Strategy, AuthGuardToken.JWT_ACCESS) {
  constructor(@Inject(BaseToken.APP_CONFIG) appConfig: IAppConfigService) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.get('JWT_SECRET'),
      algorithms: ['HS256'],
    };
    super(options, (payload: SupabaseAccessTokenJwtPayload, done: VerifiedCallback) => {
      const result: IAuthResult = {
        accessTokenPayload: payload,
        user: null,
        session: null,
      };

      done(null, result);
    });
  }
}
