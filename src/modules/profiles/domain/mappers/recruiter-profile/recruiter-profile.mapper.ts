import { IDataAccessMapper } from '~shared/domain/mappers/data-access-mapper.interface';

import { RecruiterProfile } from '../../entities/recruiter-profile.entity';

export interface IRecruiterProfileDataAccess {
  id: string;
  userDetailsId: string;
  telegram: string | null;
  phone: string | null;
  linkedin: string | null;
  company: string | null;
  website: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class RecruiterProfileMapper implements IDataAccessMapper<RecruiterProfile, IRecruiterProfileDataAccess> {
  toDomain(persistence: IRecruiterProfileDataAccess): RecruiterProfile {
    return RecruiterProfile.builder(persistence.id, persistence.userDetailsId)
      .telegram(persistence.telegram || undefined)
      .phone(persistence.phone || undefined)
      .linkedin(persistence.linkedin || undefined)
      .company(persistence.company || undefined)
      .website(persistence.website || undefined)
      .createdAt(persistence.createdAt)
      .updatedAt(persistence.updatedAt)
      .build();
  }

  toPersistence(entity: RecruiterProfile): IRecruiterProfileDataAccess {
    return {
      id: entity.id,
      userDetailsId: entity.userDetailsId,
      telegram: entity.telegram || null,
      phone: entity.phone || null,
      linkedin: entity.linkedin || null,
      company: entity.company || null,
      website: entity.website || null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
} 