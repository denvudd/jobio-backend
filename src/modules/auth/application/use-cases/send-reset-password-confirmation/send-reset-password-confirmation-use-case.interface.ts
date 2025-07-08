import { SendResetPasswordConfirmationDto } from '~modules/auth/application/dto/send-reset-password-confirmation.dto';

import { IUseCase } from '~shared/application/use-cases/use-case.interface';

export interface ISendResetPasswordConfirmationUseCase extends IUseCase<SendResetPasswordConfirmationDto> {}
