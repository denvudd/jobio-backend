import { Inject, Injectable } from '@nestjs/common';

import { ProfilesDiToken } from '~modules/profiles/constants';
import { Query } from '~shared/application/CQS/query.abstract';
import { UserRole } from '~shared/domain/enums/user-role.enum';

import { ICandidateProfileRepository } from '../../../domain/repositories/candidate-profile-repository.interface';
import { IRecruiterProfileRepository } from '../../../domain/repositories/recruiter-profile-repository.interface';
import { IUserDetailsRepository } from '../../../domain/repositories/user-details-repository.interface';
import { IGetUserProfileUseCase } from './get-user-profile-use-case.interface';

@Injectable()
export class GetUserProfileUseCase
  extends Query<
    { userId: string },
    {
      userDetails: any;
      profile: any | null;
    }
  >
  implements IGetUserProfileUseCase
{
  constructor(
    @Inject(ProfilesDiToken.USER_DETAILS_REPOSITORY)
    private readonly userDetailsRepository: IUserDetailsRepository,
    @Inject(ProfilesDiToken.CANDIDATE_PROFILE_REPOSITORY)
    private readonly candidateProfileRepository: ICandidateProfileRepository,
    @Inject(ProfilesDiToken.RECRUITER_PROFILE_REPOSITORY)
    private readonly recruiterProfileRepository: IRecruiterProfileRepository,
  ) {
    super();
  }

  protected async implementation(): Promise<{
    userDetails: any;
    profile: any | null;
  }> {
    const { userId } = this._input;

    const userDetails = await this.userDetailsRepository.findByUserId(userId);
    if (!userDetails) {
      throw new Error('User details not found');
    }

    let profile = null;
    if (userDetails.role === UserRole.CANDIDATE) {
      profile = await this.candidateProfileRepository.findByUserDetailsId(userDetails.id);
    } else if (userDetails.role === UserRole.RECRUITER) {
      profile = await this.recruiterProfileRepository.findByUserDetailsId(userDetails.id);
    }

    return {
      userDetails,
      profile,
    };
  }
}
