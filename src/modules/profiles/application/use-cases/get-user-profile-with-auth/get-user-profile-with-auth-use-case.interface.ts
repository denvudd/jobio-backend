import { CandidateProfile } from '~modules/profiles/domain/entities/candidate-profile.entity';
import { RecruiterProfile } from '~modules/profiles/domain/entities/recruiter-profile.entity';

import { Query } from '~shared/application/CQS/query.abstract';

// Type for combined user data from auth and user details
export interface IUserWithDetails {
  id: string;
  email?: string;
  phone?: string;
  emailConfirmedAt?: Date;
  phoneConfirmedAt?: Date;
  lastSignInAt?: Date;
  createdAt?: Date;
  signUpCompleted: boolean;
  fullName?: string | null;
  role: string;
  userDetailsCreatedAt: Date;
  userDetailsUpdatedAt: Date;
}

export interface IGetUserProfileWithAuthUseCase
  extends Query<
    { userId: string; accessToken: string },
    {
      user: IUserWithDetails;
      profile: CandidateProfile | RecruiterProfile | null;
    }
  > {}
