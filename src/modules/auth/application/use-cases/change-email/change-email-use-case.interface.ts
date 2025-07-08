import { UpdateUserEmailDto } from '~modules/auth/application/dto/update-user-email.dto';

import { IUseCase } from '~shared/application/use-cases/use-case.interface';

export type IChangeEmailUseCase = IUseCase<UpdateUserEmailDto>;
