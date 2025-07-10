import { CandidateProfile } from '~modules/profiles/domain/entities/candidate-profile.entity';

import { IDataAccessMapper } from '~shared/domain/mappers/data-access-mapper.interface';

export interface ICandidateProfileDataAccess {
  id: string;
  userDetailsId: string;
  position: string | null;
  skills: string[];
  experience: number | null;
  salaryExpectations: number | null;
  englishLevel: string | null;
  experienceDescription: string | null;
  accomplishmentsDescription: string | null;
  expectationsDescription: string | null;
  employmentOptions: string | null;
  hourlyRate: number | null;
  preferredLanguage: string | null;
  preferredCommunication: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class CandidateProfileMapper implements IDataAccessMapper<CandidateProfile, ICandidateProfileDataAccess> {
  toDomain(persistence: ICandidateProfileDataAccess): CandidateProfile {
    return CandidateProfile.builder(persistence.userDetailsId)
      .id(persistence.id)
      .position(persistence.position)
      .skills(persistence.skills)
      .experience(persistence.experience)
      .salaryExpectations(persistence.salaryExpectations)
      .englishLevel(persistence.englishLevel)
      .experienceDescription(persistence.experienceDescription)
      .accomplishmentsDescription(persistence.accomplishmentsDescription)
      .expectationsDescription(persistence.expectationsDescription)
      .employmentOptions(persistence.employmentOptions)
      .hourlyRate(persistence.hourlyRate)
      .preferredLanguage(persistence.preferredLanguage)
      .preferredCommunication(persistence.preferredCommunication)
      .createdAt(persistence.createdAt)
      .updatedAt(persistence.updatedAt)
      .build();
  }

  toPersistence(entity: CandidateProfile): ICandidateProfileDataAccess {
    return {
      id: entity.id,
      userDetailsId: entity.userDetailsId,
      position: entity.position || null,
      skills: entity.skills,
      experience: entity.experience || null,
      salaryExpectations: entity.salaryExpectations || null,
      englishLevel: entity.englishLevel || null,
      experienceDescription: entity.experienceDescription || null,
      accomplishmentsDescription: entity.accomplishmentsDescription || null,
      expectationsDescription: entity.expectationsDescription || null,
      employmentOptions: entity.employmentOptions || null,
      hourlyRate: entity.hourlyRate || null,
      preferredLanguage: entity.preferredLanguage || null,
      preferredCommunication: entity.preferredCommunication || null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
