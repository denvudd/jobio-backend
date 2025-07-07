import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { POSTGRES_DB } from '~lib/drizzle-postgres';
import { CandidateProfile } from '~modules/profiles/domain/entities/candidate-profile.entity';
import {
  CandidateProfileMapper,
  ICandidateProfileDataAccess,
} from '~modules/profiles/domain/mappers/candidate-profile/candidate-profile.mapper';
import { ICandidateProfileRepository } from '~modules/profiles/domain/repositories/candidate-profile-repository.interface';
import { IDataAccessMapper } from '~shared/domain/mappers';
import {
  DrizzleRepository,
  TableDefinition,
} from '~shared/infrastructure/database/drizzle/repository/drizzle.repository';
import { candidateProfile } from '~shared/infrastructure/database/drizzle/schema/public-database-schema';

@Injectable()
export class DrizzleCandidateProfileRepository
  extends DrizzleRepository<CandidateProfile, TableDefinition<typeof candidateProfile>, ICandidateProfileDataAccess>
  implements ICandidateProfileRepository
{
  constructor(
    @Inject(POSTGRES_DB) db: NodePgDatabase<any>,
    @Inject(CandidateProfileMapper) mapper: IDataAccessMapper<CandidateProfile, ICandidateProfileDataAccess>,
  ) {
    super(TableDefinition.create(candidateProfile, 'id'), db, mapper);
  }

  async findByUserDetailsId(userDetailsId: string): Promise<CandidateProfile | null> {
    const [result] = await this.db
      .select()
      .from(candidateProfile)
      .where(eq(candidateProfile.userDetailsId, userDetailsId))
      .limit(1);

    if (!result) return null;
    return this.mapper.toDomain(result as ICandidateProfileDataAccess);
  }

  async findByPosition(position: string): Promise<CandidateProfile[]> {
    const results = await this.db.select().from(candidateProfile).where(eq(candidateProfile.position, position));

    return results.map((result) => this.mapper.toDomain(result as ICandidateProfileDataAccess));
  }

  async findBySkills(skills: string[]): Promise<CandidateProfile[]> {
    // Простая реализация поиска по навыкам
    const results = await this.db.select().from(candidateProfile).where(eq(candidateProfile.skills, skills));

    return results.map((result) => this.mapper.toDomain(result as ICandidateProfileDataAccess));
  }
}
