import { Inject, Injectable } from '@nestjs/common';

import { PasswordRecoveryTimeExceededException } from '~modules/auth/application/exceptions/password-recovery-time-exceeded.exception';
import { UserHasNoPasswordException } from '~modules/auth/application/exceptions/user-has-no-password.exception';
import { IAuthService } from '~modules/auth/application/services/auth-service.interface';
import {
  IResetPasswordPayload,
  IResetPasswordUseCase,
} from '~modules/auth/application/use-cases/reset-password/reset-password-use-case.interface';
import { AuthDiToken } from '~modules/auth/constants';

import { Command } from '~shared/application/CQS/command.abstract';
import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { IDbContext } from '~shared/application/services/db-context-service.interface';
import { BaseToken } from '~shared/constants';

@Injectable()
export class ResetPasswordUseCase extends Command<IResetPasswordPayload> implements IResetPasswordUseCase {
  constructor(
    @Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(BaseToken.APP_CONFIG) private readonly appConfig: IAppConfigService,
    @Inject(BaseToken.DB_CONTEXT) private readonly dbContext: IDbContext,
  ) {
    super();
  }

  protected async implementation(): Promise<void> {
    const hashedPassword = await this.dbContext.userRepository.findHashedPassword(this._input.user.id);
    if (!hashedPassword) throw new UserHasNoPasswordException();

    const isPasswordRecoveryTimeInRange = this._input.user.isPasswordRecoveryWithinTime(
      this.appConfig.get('PASSWORD_RECOVERY_TIME'),
    );

    if (!isPasswordRecoveryTimeInRange) {
      throw new PasswordRecoveryTimeExceededException();
    }

    await this.authService.updatePassword(this._input.newPassword);
  }
}
