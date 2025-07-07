import { IUseCase } from '~shared/application/use-cases/use-case.interface';

import { UpdateRecruiterProfileDto } from '../../dto/update-recruiter-profile.dto';

export interface IUpdateRecruiterProfileUseCase extends IUseCase<UpdateRecruiterProfileDto & { userId: string }, void> {} 