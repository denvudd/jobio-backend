import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { POSTGRES_DB } from '~lib/drizzle-postgres';

import { CompanyRole } from '~modules/companies/domain/entities/company-role.entity';
import { CompanyRoleMapper, ICompanyRoleDataAccess } from '~modules/companies/domain/mappers/company-role';
import { ICompanyRoleRepository } from '~modules/companies/domain/repositories/company-role-repository.interface';

import { IDataAccessMapper } from '~shared/domain/mappers';
import {
  DrizzleRepository,
  TableDefinition,
} from '~shared/infrastructure/database/drizzle/repository/drizzle.repository';
import { MergedDbSchema } from '~shared/infrastructure/database/drizzle/schema';
import { companyRole } from '~shared/infrastructure/database/drizzle/schema/public-database-schema';

@Injectable()
export class DrizzleCompanyRoleRepository
  extends DrizzleRepository<CompanyRole, TableDefinition<typeof companyRole>, ICompanyRoleDataAccess>
  implements ICompanyRoleRepository
{
  constructor(
    @Inject(POSTGRES_DB) db: NodePgDatabase<MergedDbSchema>,
    @Inject(CompanyRoleMapper) mapper: IDataAccessMapper<CompanyRole, ICompanyRoleDataAccess>,
  ) {
    super(TableDefinition.create(companyRole, 'id'), db, mapper);
  }

  async findAll(): Promise<CompanyRole[]> {
    const result = await this.db.select().from(companyRole);
    return result.map((item) => this.mapper.toDomain(item));
  }

  public async findByName(name: string): Promise<CompanyRole | null> {
    const [result] = await this.db.select().from(companyRole).where(eq(companyRole.name, name)).limit(1);

    if (!result) return null;

    return this.mapper.toDomain(result);
  }

  public async findDefaultRole(): Promise<CompanyRole | null> {
    const [result] = await this.db.select().from(companyRole).where(eq(companyRole.isDefault, true)).limit(1);

    if (!result) return null;

    return this.mapper.toDomain(result);
  }

  public async count(): Promise<number> {
    const result = await this.db.select().from(companyRole);
    return result.length;
  }
} 