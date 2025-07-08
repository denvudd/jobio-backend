import { Inject, Injectable } from '@nestjs/common';

import { SignUpCredentialsDto } from '~modules/auth/application/dto/sign-up-credentials.dto';
import { IAuthService } from '~modules/auth/application/services/auth-service.interface';
import { ISignUpByEmailPasswordUseCase } from '~modules/auth/application/use-cases/sign-up-by-email-password/sign-up-by-email-password-use-case.interface';
import { AuthDiToken } from '~modules/auth/constants';
import { UserCreatedEvent } from '~modules/auth/domain/events/user-created.event';

import { Command } from '~shared/application/CQS/command.abstract';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

@Injectable()
export class SignUpByEmailPasswordUseCase
  extends Command<SignUpCredentialsDto, void>
  implements ISignUpByEmailPasswordUseCase
{
  constructor(
    @Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService,
  ) {
    super();
  }

  protected async implementation(): Promise<void> {
    const { email, password, role } = this._input;

    const user = await this.authService.signUpByEmailPassword(
      email,
      password,
      this.appConfig.get('CLIENT_AUTH_REDIRECT_URL'),
    );

    this._eventDispatcher.registerEvent(new UserCreatedEvent({ user, role }));
  }
}
