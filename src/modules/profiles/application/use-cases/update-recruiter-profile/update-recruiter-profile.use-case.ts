import { Inject, Injectable } from '@nestjs/common';

import { UpdateRecruiterProfileDto } from '~modules/profiles/application/dto/update-recruiter-profile.dto';
import { IUpdateRecruiterProfileUseCase } from '~modules/profiles/application/use-cases/update-recruiter-profile/update-recruiter-profile-use-case.interface';
import { ProfilesDiToken } from '~modules/profiles/constants';
import { IRecruiterProfileRepository } from '~modules/profiles/domain/repositories/recruiter-profile-repository.interface';
import { IUserDetailsRepository } from '~modules/profiles/domain/repositories/user-details-repository.interface';

import { Command } from '~shared/application/CQS/command.abstract';
import { UserRole } from '~shared/domain/enums/user-role.enum';

@Injectable()
export class UpdateRecruiterProfileUseCase
  extends Command<UpdateRecruiterProfileDto & { userId: string }, void>
  implements IUpdateRecruiterProfileUseCase
{
  constructor(
    @Inject(ProfilesDiToken.USER_DETAILS_REPOSITORY)
    private readonly userDetailsRepository: IUserDetailsRepository,
    @Inject(ProfilesDiToken.RECRUITER_PROFILE_REPOSITORY)
    private readonly recruiterProfileRepository: IRecruiterProfileRepository,
  ) {
    super();
  }

  protected async implementation(): Promise<void> {
    const { userId, ...updateData } = this._input;

    const userDetails = await this.userDetailsRepository.findByUserId(userId);
    if (!userDetails) {
      throw new Error('User details not found');
    }

    if (userDetails.role !== UserRole.RECRUITER) {
      throw new Error('User is not a recruiter');
    }

    const recruiterProfile = await this.recruiterProfileRepository.findByUserDetailsId(userDetails.id);
    if (!recruiterProfile) {
      throw new Error('Recruiter profile not found');
    }

    const updatedProfile = new (recruiterProfile.constructor as any)(
      recruiterProfile.id,
      recruiterProfile.userDetailsId,
      updateData.telegram ?? recruiterProfile.telegram,
      updateData.phone ?? recruiterProfile.phone,
      updateData.linkedin ?? recruiterProfile.linkedin,
      updateData.website ?? recruiterProfile.website,
      recruiterProfile.createdAt,
      new Date(),
    );

    await this.recruiterProfileRepository.save(updatedProfile);
  }
}
