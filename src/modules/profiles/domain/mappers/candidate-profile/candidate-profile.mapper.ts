import { IDataAccessMapper } from '~shared/domain/mappers/data-access-mapper.interface';

import { CandidateProfile } from '../../entities/candidate-profile.entity';

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
    return CandidateProfile.builder(persistence.id, persistence.userDetailsId)
      .position(persistence.position || undefined)
      .skills(persistence.skills)
      .experience(persistence.experience || undefined)
      .salaryExpectations(persistence.salaryExpectations || undefined)
      .englishLevel(persistence.englishLevel || undefined)
      .experienceDescription(persistence.experienceDescription || undefined)
      .accomplishmentsDescription(persistence.accomplishmentsDescription || undefined)
      .expectationsDescription(persistence.expectationsDescription || undefined)
      .employmentOptions(persistence.employmentOptions || undefined)
      .hourlyRate(persistence.hourlyRate || undefined)
      .preferredLanguage(persistence.preferredLanguage || undefined)
      .preferredCommunication(persistence.preferredCommunication || undefined)
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