import { Inject, Injectable } from '@nestjs/common';

import { PasswordsNotMatchException } from '~modules/auth/application/exceptions/passwords-not-match.exception';
import { UserHasNoPasswordException } from '~modules/auth/application/exceptions/user-has-no-password.exception';
import { IPasswordService } from '~modules/auth/application/repositories/password-service.interface';
import { IAuthService } from '~modules/auth/application/services/auth-service.interface';
import {
  IChangePasswordPayload,
  IChangePasswordUseCase,
} from '~modules/auth/application/use-cases/change-password/change-password-use-case.interface';
import { AuthDiToken } from '~modules/auth/constants';

import { Command } from '~shared/application/CQS/command.abstract';
import { IDbContext } from '~shared/application/services/db-context-service.interface';
import { BaseToken } from '~shared/constants';

@Injectable()
export class ChangePasswordUseCase extends Command<IChangePasswordPayload> implements IChangePasswordUseCase {
  constructor(
    @Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: IAuthService,
    @Inject(AuthDiToken.PASSWORD_SERVICE) private readonly passwordService: IPasswordService,
    @Inject(BaseToken.DB_CONTEXT) private readonly dbContext: IDbContext,
  ) {
    super();
  }

  protected async implementation(): Promise<void> {
    const hashedPassword = await this.dbContext.userRepository.findHashedPassword(this._input.userId);
    if (!hashedPassword) throw new UserHasNoPasswordException();

    const isPasswordMatching = await this.passwordService.confirm(this._input.updateDto.oldPassword, hashedPassword);
    if (!isPasswordMatching) throw new PasswordsNotMatchException();

    await this.authService.updatePassword(this._input.updateDto.newPassword);
  }
}
