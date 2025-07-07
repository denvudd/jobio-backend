import { IUseCase } from '~shared/application/use-cases/use-case.interface';

import { UserDetails } from '../../../domain/entities/user-details.entity';
import { CandidateProfile } from '../../../domain/entities/candidate-profile.entity';
import { RecruiterProfile } from '../../../domain/entities/recruiter-profile.entity';

export interface IGetUserProfileUseCase extends IUseCase<{ userId: string }, {
  userDetails: UserDetails;
  profile: CandidateProfile | RecruiterProfile | null;
}> {} 