import { CreateUserProfileDto } from '~modules/profiles/application/dto/create-user-profile.dto';

import { IUseCase } from '~shared/application/use-cases/use-case.interface';

export interface ICreateUserProfileUseCase extends IUseCase<CreateUserProfileDto & { userId: string }, void> {}
