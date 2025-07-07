import { Inject, Injectable } from '@nestjs/common';

import { ProfilesDiToken } from '~modules/profiles/constants';
import { Command } from '~shared/application/CQS/command.abstract';

import { UpdateCandidateProfileDto } from '../../dto/update-candidate-profile.dto';
import { ICandidateProfileRepository } from '../../../domain/repositories/candidate-profile-repository.interface';
import { IUserDetailsRepository } from '../../../domain/repositories/user-details-repository.interface';
import { IUpdateCandidateProfileUseCase } from './update-candidate-profile-use-case.interface';

@Injectable()
export class UpdateCandidateProfileUseCase
  extends Command<UpdateCandidateProfileDto & { userId: string }, void>
  implements IUpdateCandidateProfileUseCase
{
  constructor(
    @Inject(ProfilesDiToken.USER_DETAILS_REPOSITORY)
    private readonly userDetailsRepository: IUserDetailsRepository,
    @Inject(ProfilesDiToken.CANDIDATE_PROFILE_REPOSITORY)
    private readonly candidateProfileRepository: ICandidateProfileRepository,
  ) {
    super();
  }

  protected async implementation(): Promise<void> {
    const { userId, ...updateData } = this._input;

    const userDetails = await this.userDetailsRepository.findByUserId(userId);
    if (!userDetails) {
      throw new Error('User details not found');
    }

    if (userDetails.role !== 'candidate') {
      throw new Error('User is not a candidate');
    }

    const candidateProfile = await this.candidateProfileRepository.findByUserDetailsId(userDetails.id);
    if (!candidateProfile) {
      throw new Error('Candidate profile not found');
    }

    // Обновляем профиль с новыми данными
    const updatedProfile = new (candidateProfile.constructor as any)(
      candidateProfile.id,
      candidateProfile.userDetailsId,
      updateData.position ?? candidateProfile.position,
      updateData.skills ?? candidateProfile.skills,
      updateData.experience ?? candidateProfile.experience,
      updateData.salaryExpectations ?? candidateProfile.salaryExpectations,
      updateData.englishLevel ?? candidateProfile.englishLevel,
      updateData.experienceDescription ?? candidateProfile.experienceDescription,
      updateData.accomplishmentsDescription ?? candidateProfile.accomplishmentsDescription,
      updateData.expectationsDescription ?? candidateProfile.expectationsDescription,
      updateData.employmentOptions ?? candidateProfile.employmentOptions,
      updateData.hourlyRate ?? candidateProfile.hourlyRate,
      updateData.preferredLanguage ?? candidateProfile.preferredLanguage,
      updateData.preferredCommunication ?? candidateProfile.preferredCommunication,
      candidateProfile.createdAt,
      new Date(), // Обновляем updatedAt
    );

    await this.candidateProfileRepository.save(updatedProfile);
  }
} 