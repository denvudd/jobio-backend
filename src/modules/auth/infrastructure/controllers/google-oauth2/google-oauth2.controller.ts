import { Controller, Get, Inject, Res, UseGuards } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { IPerformPostAuthUseCase } from '~modules/auth/application/use-cases/perform-post-auth/perform-post-auth.interface';
import { AuthDiToken } from '~modules/auth/constants';
import { User } from '~modules/auth/domain/entities/user.entity';
import { Session } from '~modules/auth/domain/value-objects/session.value';
import { PublicRoute } from '~modules/auth/infrastructure/decorators/public-route/public-route.decorator';
import { ReqSession } from '~modules/auth/infrastructure/decorators/session/session.decorator';
import { ReqUser } from '~modules/auth/infrastructure/decorators/user/user.decorator';
import { GoogleOauth2Guard } from '~modules/auth/infrastructure/supabase/guards/google-oauth2/google-oauth2.guard';

import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

@ApiTags('auth')
@Controller('auth/oauth')
export class GoogleOauth2Controller {
  constructor(
    @Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService,
    @Inject(AuthDiToken.PERFORM_POST_AUTH_USE_CASE) private readonly performPostAuthUseCase: IPerformPostAuthUseCase,
  ) {}

  @PublicRoute()
  @UseGuards(GoogleOauth2Guard)
  @ApiOperation({
    operationId: 'withGoogle',
    summary: 'Google OAuth2',
    description: 'Initiate Google OAuth2 authentication flow',
  })
  @Get('google')
  public async google() {}

  @PublicRoute()
  @UseGuards(GoogleOauth2Guard)
  @ApiExcludeEndpoint()
  @Get('google-callback')
  public async googleRedirect(@Res() res: Response, @ReqSession() session: Session, @ReqUser() user: User) {
    await this.performPostAuthUseCase.execute({ user });
    const redirectUrl = new URL(this.appConfig.get('CLIENT_AUTH_REDIRECT_URL'));

    redirectUrl.searchParams.set('access-token', session.accessToken);
    redirectUrl.searchParams.set('refresh-token', session.refreshToken);
    redirectUrl.searchParams.set('token_type', 'Bearer');

    res.redirect(redirectUrl.toString());
  }
}
