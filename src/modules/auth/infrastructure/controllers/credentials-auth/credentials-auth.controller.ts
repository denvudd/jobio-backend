import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { SignInCredentialsDto } from '~modules/auth/application/dto/sign-in-credentials.dto';
import { SignUpCredentialsDto } from '~modules/auth/application/dto/sign-up-credentials.dto';
import { IPerformPostAuthUseCase } from '~modules/auth/application/use-cases/perform-post-auth/perform-post-auth.interface';
import { ISignUpByEmailPasswordUseCase } from '~modules/auth/application/use-cases/sign-up-by-email-password/sign-up-by-email-password-use-case.interface';
import { AuthDiToken } from '~modules/auth/constants';
import { User } from '~modules/auth/domain/entities/user.entity';
import { AuthCredentialsMapper } from '~modules/auth/domain/mappers/auth-credentials/auth-credentials.mapper';
import { Session } from '~modules/auth/domain/value-objects/session.value';
import { PublicRoute } from '~modules/auth/infrastructure/decorators/public-route/public-route.decorator';
import { ReqSession } from '~modules/auth/infrastructure/decorators/session/session.decorator';
import { ReqUser } from '~modules/auth/infrastructure/decorators/user/user.decorator';
import { CredentialsLoginAuthGuard } from '~modules/auth/infrastructure/supabase/guards/credentials-login-auth/credentials-login-auth.guard';

@ApiTags('auth')
@PublicRoute()
@Controller('auth')
export class CredentialsAuthController {
  constructor(
    private readonly authCredentialsMapper: AuthCredentialsMapper,
    @Inject(AuthDiToken.SIGN_UP_BY_EMAIL_PASSWORD)
    private readonly signUpByEmailPasswordUseCase: ISignUpByEmailPasswordUseCase,
    @Inject(AuthDiToken.PERFORM_POST_AUTH_USE_CASE) private readonly performPostAuthUseCase: IPerformPostAuthUseCase,
  ) {}

  @ApiOperation({
    operationId: 'signIn',
    summary: 'Sign in',
    description: 'Sign in with email and password credentials',
  })
  @ApiBody({
    type: SignInCredentialsDto,
  })
  @Post('/sign-in')
  @UseGuards(CredentialsLoginAuthGuard)
  public async signIn(@ReqSession() session: Session, @ReqUser() user: User) {
    await this.performPostAuthUseCase.execute({ user });
    return this.authCredentialsMapper.sessionToTokenResult(session);
  }

  @ApiOperation({
    operationId: 'signUp',
    summary: 'Sign up',
    description: 'Create a new user account with email and password',
  })
  @ApiBody({
    type: SignUpCredentialsDto,
  })
  @Post('/sign-up')
  public async signUp(@Body() credentials: SignUpCredentialsDto) {
    await this.signUpByEmailPasswordUseCase.execute(credentials);
  }
}
