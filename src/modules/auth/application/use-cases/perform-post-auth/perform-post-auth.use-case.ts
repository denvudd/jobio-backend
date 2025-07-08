import { Inject, Injectable } from '@nestjs/common';

import { IAuthService } from '~modules/auth/application/services/auth-service.interface';
import {
  IPerformPostAuthPayload,
  IPerformPostAuthUseCase,
} from '~modules/auth/application/use-cases/perform-post-auth/perform-post-auth.interface';
import { AuthDiToken } from '~modules/auth/constants';

import { Command } from '~shared/application/CQS/command.abstract';

@Injectable()
export class PerformPostAuthUseCase extends Command<IPerformPostAuthPayload, void> implements IPerformPostAuthUseCase {
  constructor(@Inject(AuthDiToken.AUTH_SERVICE) private readonly authService: IAuthService) {
    super();
  }

  protected async implementation(): Promise<void> {
    const { user } = this._input;
    if (user.signUpCompleted) return;

    await this.authService.markSignUpFinished();
  }
}
