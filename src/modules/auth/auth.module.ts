import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { ChangeEmailUseCase } from '~modules/auth/application/use-cases/change-email/change-email.use-case';
import { ChangePasswordUseCase } from '~modules/auth/application/use-cases/change-password/change-password.use-case';
import { PerformPostAuthUseCase } from '~modules/auth/application/use-cases/perform-post-auth/perform-post-auth.use-case';
import { ResetPasswordUseCase } from '~modules/auth/application/use-cases/reset-password/reset-password.use-case';
import { SendResetPasswordConfirmationUseCase } from '~modules/auth/application/use-cases/send-reset-password-confirmation/send-reset-password-confirmation.use-case';
import { SignUpByEmailPasswordUseCase } from '~modules/auth/application/use-cases/sign-up-by-email-password/sign-up-by-email-password.use-case';
import { AuthDiToken } from '~modules/auth/constants';
import { AuthCredentialsMapper } from '~modules/auth/domain/mappers/auth-credentials/auth-credentials.mapper';
import { CredentialsAuthController } from '~modules/auth/infrastructure/controllers/credentials-auth/credentials-auth.controller';
import { CredentialsManagementController } from '~modules/auth/infrastructure/controllers/credentials-management/credentials-management.controller';
import { GoogleOauth2Controller } from '~modules/auth/infrastructure/controllers/google-oauth2/google-oauth2.controller';
import { JwtManagementController } from '~modules/auth/infrastructure/controllers/jwt-management/jwt-management.controller';
import { BcryptPasswordService } from '~modules/auth/infrastructure/services/password/bcrypt-password.service';
import { JwtAccessAuthGuard } from '~modules/auth/infrastructure/supabase/guards/jwt-access-auth/jwt-access-auth.guard';
import { SupabaseAccessTokenJwtPayloadMapper } from '~modules/auth/infrastructure/supabase/mappers/access-token-jwt-payload/supabase-access-token-jwt-payload.mapper';
import { SupabaseSessionMapper } from '~modules/auth/infrastructure/supabase/mappers/session/supabase-session.mapper';
import { SupabaseUserMapper } from '~modules/auth/infrastructure/supabase/mappers/user/supabase-user.mapper';
import { SupabaseAuthService } from '~modules/auth/infrastructure/supabase/services/auth/supabase-auth.service';
import { SupabaseAuthenticatedClientService } from '~modules/auth/infrastructure/supabase/services/supabase-authenticated-client/supabase-authenticated-client.service';
import { SupabaseClientService } from '~modules/auth/infrastructure/supabase/services/supabase-client/supabase-client.service';
import { SupabaseEmailPasswordLoginAuthStrategy } from '~modules/auth/infrastructure/supabase/strategies/credentials-login/supabase-email-password-login-auth.strategy';
import { SupabaseGoogleOAuth2Strategy } from '~modules/auth/infrastructure/supabase/strategies/google-oauth2/supabase-google-oauth2.strategy';
import { SupabaseJwtAccessAuthStrategy } from '~modules/auth/infrastructure/supabase/strategies/jwt-access/supabase-jwt-access-auth.strategy';
import { SupabaseJwtRefreshAuthStrategy } from '~modules/auth/infrastructure/supabase/strategies/jwt-refresh/supabase-jwt-refresh-auth.strategy';

@Module({
  providers: [
    SupabaseEmailPasswordLoginAuthStrategy,
    SupabaseJwtAccessAuthStrategy,
    SupabaseJwtRefreshAuthStrategy,
    SupabaseGoogleOAuth2Strategy,
    SupabaseUserMapper,
    SupabaseSessionMapper,
    AuthCredentialsMapper,
    SupabaseAuthenticatedClientService,
    SupabaseAccessTokenJwtPayloadMapper,
    { provide: AuthDiToken.AUTH_SERVICE, useClass: SupabaseAuthService },
    { provide: AuthDiToken.CHANGE_PASSWORD_USE_CASE, useClass: ChangePasswordUseCase },
    { provide: AuthDiToken.CHANGE_EMAIL_USE_CASE, useClass: ChangeEmailUseCase },
    SupabaseClientService,
    { provide: AuthDiToken.SEND_RESET_PASSWORD_CONFIRMATION_USE_CASE, useClass: SendResetPasswordConfirmationUseCase },
    { provide: AuthDiToken.RESET_PASSWORD_USE_CASE, useClass: ResetPasswordUseCase },
    { provide: AuthDiToken.PASSWORD_SERVICE, useClass: BcryptPasswordService },
    { provide: AuthDiToken.SIGN_UP_BY_EMAIL_PASSWORD, useClass: SignUpByEmailPasswordUseCase },
    { provide: AuthDiToken.PERFORM_POST_AUTH_USE_CASE, useClass: PerformPostAuthUseCase },
    { provide: APP_GUARD, useClass: JwtAccessAuthGuard },
  ],
  controllers: [
    CredentialsAuthController,
    GoogleOauth2Controller,
    JwtManagementController,
    CredentialsManagementController,
  ],
  exports: [
    SupabaseUserMapper,
    SupabaseSessionMapper,
    SupabaseAccessTokenJwtPayloadMapper,
    SupabaseAuthenticatedClientService,
    SupabaseClientService,
  ],
})
export class AuthModule {}
