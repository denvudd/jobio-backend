import { Inject, Injectable } from '@nestjs/common';

import { SupabaseUserMapper } from '~modules/auth/infrastructure/supabase/mappers/user/supabase-user.mapper';
import { SupabaseClientService } from '~modules/auth/infrastructure/supabase/services/supabase-client/supabase-client.service';
import { ProfilesDiToken } from '~modules/profiles/constants';
import { CandidateProfile } from '~modules/profiles/domain/entities/candidate-profile.entity';
import { RecruiterProfile } from '~modules/profiles/domain/entities/recruiter-profile.entity';
import { ICandidateProfileRepository } from '~modules/profiles/domain/repositories/candidate-profile-repository.interface';
import { IRecruiterProfileRepository } from '~modules/profiles/domain/repositories/recruiter-profile-repository.interface';
import { IUserDetailsRepository } from '~modules/profiles/domain/repositories/user-details-repository.interface';

import { Query } from '~shared/application/CQS/query.abstract';
import { UserRole } from '~shared/domain/enums/user-role.enum';

import { IGetUserProfileWithAuthUseCase, IUserWithDetails } from './get-user-profile-with-auth-use-case.interface';

@Injectable()
export class GetUserProfileWithAuthUseCase
  extends Query<
    { userId: string; accessToken: string },
    {
      user: IUserWithDetails;
      profile: CandidateProfile | RecruiterProfile | null;
    }
  >
  implements IGetUserProfileWithAuthUseCase
{
  constructor(
    @Inject(ProfilesDiToken.USER_DETAILS_REPOSITORY)
    private readonly userDetailsRepository: IUserDetailsRepository,
    @Inject(ProfilesDiToken.CANDIDATE_PROFILE_REPOSITORY)
    private readonly candidateProfileRepository: ICandidateProfileRepository,
    @Inject(ProfilesDiToken.RECRUITER_PROFILE_REPOSITORY)
    private readonly recruiterProfileRepository: IRecruiterProfileRepository,
    private readonly supabaseClientService: SupabaseClientService,
    @Inject(SupabaseUserMapper)
    private readonly supabaseUserMapper: SupabaseUserMapper,
  ) {
    super();
  }

  protected async implementation(): Promise<{
    user: IUserWithDetails;
    profile: CandidateProfile | RecruiterProfile | null;
  }> {
    const { userId, accessToken } = this._input;

    // Get auth user data from Supabase using the access token
    const { data, error } = await this.supabaseClientService.client.auth.getUser(accessToken);
    if (error) throw new Error('Failed to get auth user data');

    // Verify that the requested userId matches the authenticated user
    if (data.user.id !== userId) {
      throw new Error('Unauthorized access to user profile');
    }

    const authUser = this.supabaseUserMapper.toDomain(data.user);

    // Get user details from our database
    const userDetails = await this.userDetailsRepository.findByUserId(userId);

    if (!userDetails) {
      throw new Error('User details not found');
    }

    let profile = null;

    // Get profile based on user role
    if (userDetails.role === UserRole.CANDIDATE) {
      profile = await this.candidateProfileRepository.findByUserDetailsId(userDetails.id);
    } else if (userDetails.role === UserRole.RECRUITER) {
      profile = await this.recruiterProfileRepository.findByUserDetailsId(userDetails.id);
    }

    // Create combined user object
    const userWithDetails: IUserWithDetails = {
      ...authUser,
      fullName: userDetails.fullName,
      role: userDetails.role,
      userDetailsCreatedAt: userDetails.createdAt,
      userDetailsUpdatedAt: userDetails.updatedAt,
    };

    return {
      user: userWithDetails,
      profile,
    };
  }
}
