import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { POSTGRES_DB } from '~lib/drizzle-postgres';

import { CompanyPermission } from '~modules/companies/domain/entities/company-permission.entity';
import { CompanyPermissionMapper, ICompanyPermissionDataAccess } from '~modules/companies/domain/mappers/company-permission';
import { ICompanyPermissionRepository } from '~modules/companies/domain/repositories/company-permission-repository.interface';

import { IDataAccessMapper } from '~shared/domain/mappers';
import {
  DrizzleRepository,
  TableDefinition,
} from '~shared/infrastructure/database/drizzle/repository/drizzle.repository';
import { MergedDbSchema } from '~shared/infrastructure/database/drizzle/schema';
import { companyPermission } from '~shared/infrastructure/database/drizzle/schema/public-database-schema';

@Injectable()
export class DrizzleCompanyPermissionRepository
  extends DrizzleRepository<CompanyPermission, TableDefinition<typeof companyPermission>, ICompanyPermissionDataAccess>
  implements ICompanyPermissionRepository
{
  constructor(
    @Inject(POSTGRES_DB) db: NodePgDatabase<MergedDbSchema>,
    @Inject(CompanyPermissionMapper) mapper: IDataAccessMapper<CompanyPermission, ICompanyPermissionDataAccess>,
  ) {
    super(TableDefinition.create(companyPermission, 'id'), db, mapper);
  }

  async findAll(): Promise<CompanyPermission[]> {
    const result = await this.db.select().from(companyPermission);
    return result.map((item) => this.mapper.toDomain(item));
  }

  public async findByName(name: string): Promise<CompanyPermission | null> {
    const [result] = await this.db.select().from(companyPermission).where(eq(companyPermission.name, name)).limit(1);

    if (!result) return null;

    return this.mapper.toDomain(result);
  }

  public async count(): Promise<number> {
    const result = await this.db.select().from(companyPermission);
    return result.length;
  }
}
