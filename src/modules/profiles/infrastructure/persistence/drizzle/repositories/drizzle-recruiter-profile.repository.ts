import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { POSTGRES_DB } from '~lib/drizzle-postgres';

import { IRecruiterProfileRepository } from '~modules/profiles/domain//repositories/recruiter-profile-repository.interface';
import { RecruiterProfile } from '~modules/profiles/domain/entities/recruiter-profile.entity';
import {
  IRecruiterProfileDataAccess,
  RecruiterProfileMapper,
} from '~modules/profiles/domain/mappers/recruiter-profile/recruiter-profile.mapper';

import { IDataAccessMapper } from '~shared/domain/mappers';
import {
  DrizzleRepository,
  TableDefinition,
} from '~shared/infrastructure/database/drizzle/repository/drizzle.repository';
import { MergedDbSchema } from '~shared/infrastructure/database/drizzle/schema';
import { recruiterProfile } from '~shared/infrastructure/database/drizzle/schema/public-database-schema';

@Injectable()
export class DrizzleRecruiterProfileRepository
  extends DrizzleRepository<RecruiterProfile, TableDefinition<typeof recruiterProfile>, IRecruiterProfileDataAccess>
  implements IRecruiterProfileRepository
{
  constructor(
    @Inject(POSTGRES_DB) db: NodePgDatabase<MergedDbSchema>,
    @Inject(RecruiterProfileMapper) mapper: IDataAccessMapper<RecruiterProfile, IRecruiterProfileDataAccess>,
  ) {
    super(TableDefinition.create(recruiterProfile, 'id'), db, mapper);
  }

  async findByUserDetailsId(userDetailsId: string): Promise<RecruiterProfile | null> {
    const [result] = await this.db
      .select()
      .from(recruiterProfile)
      .where(eq(recruiterProfile.userDetailsId, userDetailsId))
      .limit(1);

    if (!result) return null;
    return this.mapper.toDomain(result as IRecruiterProfileDataAccess);
  }

  async findByCompany(company: string): Promise<RecruiterProfile[]> {
    const results = await this.db.select().from(recruiterProfile).where(eq(recruiterProfile.company, company));

    return results.map((result) => this.mapper.toDomain(result as IRecruiterProfileDataAccess));
  }
}
