import { Inject, Injectable } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { POSTGRES_DB } from '~lib/drizzle-postgres';

import { 
  CompanyRolePermissionMapper, 
  ICompanyRolePermissionDataAccess
} from '~modules/companies/domain/mappers/company-role-permission';
import { CompanyRolePermission } from '~modules/companies/domain/entities/company-role-permission.entity';
import { ICompanyRolePermissionRepository } from '~modules/companies/domain/repositories/company-role-permission-repository.interface';

import { IDataAccessMapper } from '~shared/domain/mappers';
import {
  DrizzleRepository,
  TableDefinition,
} from '~shared/infrastructure/database/drizzle/repository/drizzle.repository';
import { MergedDbSchema } from '~shared/infrastructure/database/drizzle/schema';
import { companyRolePermission } from '~shared/infrastructure/database/drizzle/schema/public-database-schema';

@Injectable()
export class DrizzleCompanyRolePermissionRepository
  extends DrizzleRepository<CompanyRolePermission, TableDefinition<typeof companyRolePermission>, ICompanyRolePermissionDataAccess>
  implements ICompanyRolePermissionRepository
{
  constructor(
    @Inject(POSTGRES_DB) db: NodePgDatabase<MergedDbSchema>,
    @Inject(CompanyRolePermissionMapper) mapper: IDataAccessMapper<CompanyRolePermission, ICompanyRolePermissionDataAccess>,
  ) {
    super(TableDefinition.create(companyRolePermission, 'id'), db, mapper);
  }

  async findAll(): Promise<CompanyRolePermission[]> {
    const result = await this.db.select().from(companyRolePermission);
    return result.map((item) => this.mapper.toDomain(item));
  }

  async assignPermissionToRole(roleId: string, permissionId: string): Promise<void> {
    await this.db.insert(companyRolePermission).values({
      companyRoleId: roleId,
      companyPermissionId: permissionId,
    });
  }

  async removePermissionFromRole(roleId: string, permissionId: string): Promise<void> {
    await this.db.delete(companyRolePermission)
      .where(and(
        eq(companyRolePermission.companyRoleId, roleId),
        eq(companyRolePermission.companyPermissionId, permissionId)
      ));
  }

  async getPermissionsByRoleId(roleId: string): Promise<string[]> {
    const result = await this.db.select({ companyPermissionId: companyRolePermission.companyPermissionId })
      .from(companyRolePermission)
      .where(eq(companyRolePermission.companyRoleId, roleId));

    return result.map(item => item.companyPermissionId);
  }

  async hasPermission(roleId: string, permissionId: string): Promise<boolean> {
    const [result] = await this.db.select()
      .from(companyRolePermission)
      .where(and(
        eq(companyRolePermission.companyRoleId, roleId),
        eq(companyRolePermission.companyPermissionId, permissionId)
      ))
      .limit(1);

    return result !== undefined;
  }
} 