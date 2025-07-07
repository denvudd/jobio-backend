import { UpdateRecruiterProfileDto } from '~modules/profiles/application/dto/update-recruiter-profile.dto';

import { IUseCase } from '~shared/application/use-cases/use-case.interface';

export interface IUpdateRecruiterProfileUseCase
  extends IUseCase<UpdateRecruiterProfileDto & { userId: string }, void> {}
