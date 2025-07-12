import { Inject, Injectable } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { POSTGRES_DB } from '~lib/drizzle-postgres';

import { UserCompany } from '~modules/companies/domain/entities/user-company.entity';
import { UserCompanyMapper, IUserCompanyDataAccess } from '~modules/companies/domain/mappers/user-company/user-company.mapper';
import { IUserCompanyRepository } from '~modules/companies/domain/repositories/user-company-repository.interface';

import { IDataAccessMapper } from '~shared/domain/mappers';
import {
  DrizzleRepository,
  TableDefinition,
} from '~shared/infrastructure/database/drizzle/repository/drizzle.repository';
import { MergedDbSchema } from '~shared/infrastructure/database/drizzle/schema';
import { userCompany } from '~shared/infrastructure/database/drizzle/schema/public-database-schema';

@Injectable()
export class DrizzleUserCompanyRepository
  extends DrizzleRepository<UserCompany, TableDefinition<typeof userCompany>, IUserCompanyDataAccess>
  implements IUserCompanyRepository
{
  constructor(
    @Inject(POSTGRES_DB) db: NodePgDatabase<MergedDbSchema>,
    @Inject(UserCompanyMapper) mapper: IDataAccessMapper<UserCompany, IUserCompanyDataAccess>,
  ) {
    super(TableDefinition.create(userCompany, 'id'), db, mapper);
  }

  async findByRecruiterProfileId(recruiterProfileId: string): Promise<UserCompany[]> {
    const result = await this.db
      .select()
      .from(userCompany)
      .where(eq(userCompany.recruiterProfileId, recruiterProfileId));

    return result.map((item) => this.mapper.toDomain(item));
  }

  async findByCompanyId(companyId: string): Promise<UserCompany[]> {
    const result = await this.db
      .select()
      .from(userCompany)
      .where(eq(userCompany.companyId, companyId));

    return result.map((item) => this.mapper.toDomain(item));
  }

  async findByRecruiterProfileIdAndCompanyId(recruiterProfileId: string, companyId: string): Promise<UserCompany | null> {
    const [result] = await this.db
      .select()
      .from(userCompany)
      .where(and(
        eq(userCompany.recruiterProfileId, recruiterProfileId),
        eq(userCompany.companyId, companyId)
      ))
      .limit(1);

    if (!result) return null;

    return this.mapper.toDomain(result);
  }
} 