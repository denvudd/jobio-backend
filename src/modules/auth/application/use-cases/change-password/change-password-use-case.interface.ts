import { UpdateUserPasswordDto } from '~modules/auth/application/dto/update-user-password.dto';

import { IUseCase } from '~shared/application/use-cases/use-case.interface';

export interface IChangePasswordPayload {
  updateDto: UpdateUserPasswordDto;
  userId: string;
}

export interface IChangePasswordUseCase extends IUseCase<IChangePasswordPayload> {}
