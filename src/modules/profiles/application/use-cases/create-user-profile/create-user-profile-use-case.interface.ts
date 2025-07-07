import { IUseCase } from '~shared/application/use-cases/use-case.interface';

import { CreateUserProfileDto } from '../../dto/create-user-profile.dto';

export interface ICreateUserProfileUseCase extends IUseCase<CreateUserProfileDto & { userId: string }, void> {} 