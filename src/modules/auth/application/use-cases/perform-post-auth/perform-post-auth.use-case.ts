import { Inject, Injectable } from '@nestjs/common';

import { AuthDiToken } from '~modules/auth/constants';
import { Command } from '~shared/application/CQS/command.abstract';

import { IAuthService } from '../../services/auth-service.interface';
import { IPerformPostAuthPayload, IPerformPostAuthUseCase } from './perform-post-auth.interface';

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