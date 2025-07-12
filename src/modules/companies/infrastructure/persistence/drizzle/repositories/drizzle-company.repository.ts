import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { POSTGRES_DB } from '~lib/drizzle-postgres';

import { Company } from '~modules/companies/domain/entities/company.entity';
import { CompanyMapper, ICompanyDataAccess } from '~modules/companies/domain/mappers/company/company.mapper';
import { ICompanyRepository } from '~modules/companies/domain/repositories/company-repository.interface';

import { IDataAccessMapper } from '~shared/domain/mappers';
import {
  DrizzleRepository,
  TableDefinition,
} from '~shared/infrastructure/database/drizzle/repository/drizzle.repository';
import { MergedDbSchema } from '~shared/infrastructure/database/drizzle/schema';
import { company } from '~shared/infrastructure/database/drizzle/schema/public-database-schema';

@Injectable()
export class DrizzleCompanyRepository
  extends DrizzleRepository<Company, TableDefinition<typeof company>, ICompanyDataAccess>
  implements ICompanyRepository
{
  constructor(
    @Inject(POSTGRES_DB) db: NodePgDatabase<MergedDbSchema>,
    @Inject(CompanyMapper) mapper: IDataAccessMapper<Company, ICompanyDataAccess>,
  ) {
    super(TableDefinition.create(company, 'id'), db, mapper);
  }

  async findAll(): Promise<Company[]> {
    const result = await this.db.select().from(company);
    return result.map((item) => this.mapper.toDomain(item));
  }

  public async findByName(name: string): Promise<Company | null> {
    const [result] = await this.db.select().from(company).where(eq(company.name, name)).limit(1);

    if (!result) return null;

    return this.mapper.toDomain(result);
  }

  public async count(): Promise<number> {
    const result = await this.db.select().from(company);
    return result.length;
  }
}
