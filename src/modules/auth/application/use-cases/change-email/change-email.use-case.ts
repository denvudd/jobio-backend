import { Inject, Injectable } from '@nestjs/common';

import { UpdateUserEmailDto } from '~modules/auth/application/dto/update-user-email.dto';
import { IAuthService } from '~modules/auth/application/services/auth-service.interface';
import { IChangeEmailUseCase } from '~modules/auth/application/use-cases/change-email/change-email-use-case.interface';
import { AuthDiToken } from '~modules/auth/constants';

import { Command } from '~shared/application/CQS/command.abstract';

@Injectable()
export class ChangeEmailUseCase extends Command<UpdateUserEmailDto> implements IChangeEmailUseCase {
  constructor(@Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: IAuthService) {
    super();
  }

  protected async implementation(): Promise<void> {
    await this.authService.updateEmail(this._input.newEmail);
  }
}
