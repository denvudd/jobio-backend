import { Inject, Injectable } from '@nestjs/common';

import { SendResetPasswordConfirmationDto } from '~modules/auth/application/dto/send-reset-password-confirmation.dto';
import { IAuthService } from '~modules/auth/application/services/auth-service.interface';
import { ISendResetPasswordConfirmationUseCase } from '~modules/auth/application/use-cases/send-reset-password-confirmation/send-reset-password-confirmation-use-case.interface';
import { AuthDiToken } from '~modules/auth/constants';

import { Command } from '~shared/application/CQS/command.abstract';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';

@Injectable()
export class SendResetPasswordConfirmationUseCase
  extends Command<SendResetPasswordConfirmationDto>
  implements ISendResetPasswordConfirmationUseCase
{
  constructor(
    @Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService,
  ) {
    super();
  }

  protected async implementation(): Promise<void> {
    await this.authService.sendResetPasswordEmail(this._input.email, this.appConfig.get('PASSWORD_RESET_REDIRECT_URL'));
  }
}
