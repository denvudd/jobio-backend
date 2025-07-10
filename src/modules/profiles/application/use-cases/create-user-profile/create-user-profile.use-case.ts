import { Inject, Injectable } from '@nestjs/common';

import { CreateUserProfileDto } from '~modules/profiles/application/dto/create-user-profile.dto';
import { ICreateUserProfileUseCase } from '~modules/profiles/application/use-cases/create-user-profile/create-user-profile-use-case.interface';
import { ProfilesDiToken } from '~modules/profiles/constants';
import { CandidateProfile } from '~modules/profiles/domain/entities/candidate-profile.entity';
import { RecruiterProfile } from '~modules/profiles/domain/entities/recruiter-profile.entity';
import { UserDetails } from '~modules/profiles/domain/entities/user-details.entity';
import { ICandidateProfileRepository } from '~modules/profiles/domain/repositories/candidate-profile-repository.interface';
import { IRecruiterProfileRepository } from '~modules/profiles/domain/repositories/recruiter-profile-repository.interface';
import { IUserDetailsRepository } from '~modules/profiles/domain/repositories/user-details-repository.interface';

import { Command } from '~shared/application/CQS/command.abstract';
import { UserRole } from '~shared/domain/enums/user-role.enum';

@Injectable()
export class CreateUserProfileUseCase
  extends Command<CreateUserProfileDto & { userId: string }, void>
  implements ICreateUserProfileUseCase
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

  protected async implementation(): Promise<void> {
    const { userId, fullName, role } = this._input;

    const userDetails = UserDetails.builder(userId, role).fullName(fullName).build();
    const savedUserDetails = await this.userDetailsRepository.create(userDetails);

    if (role === UserRole.CANDIDATE) {
      const candidateProfile = CandidateProfile.builder(savedUserDetails.id).build();
      await this.candidateProfileRepository.create(candidateProfile);
    } else if (role === UserRole.RECRUITER) {
      const recruiterProfile = RecruiterProfile.builder(savedUserDetails.id).build();
      await this.recruiterProfileRepository.create(recruiterProfile);
    }
  }
}
