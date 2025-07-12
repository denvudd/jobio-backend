import { CompanyRolePermission } from '~modules/companies/domain/entities/company-role-permission.entity';

import { IDataAccessMapper } from '~shared/domain/mappers';

export interface ICompanyRolePermissionDataAccess {
  id: string;
  companyRoleId: string;
  companyPermissionId: string;
  createdAt: Date;
}

export class CompanyRolePermissionMapper implements IDataAccessMapper<CompanyRolePermission, ICompanyRolePermissionDataAccess> {
  toDomain(persistence: ICompanyRolePermissionDataAccess): CompanyRolePermission {
    return CompanyRolePermission.builder(persistence.companyRoleId, persistence.companyPermissionId)
      .id(persistence.id)
      .createdAt(persistence.createdAt)
      .build();
  }

  toPersistence(entity: CompanyRolePermission): ICompanyRolePermissionDataAccess {
    return {
      id: entity.id,
      companyRoleId: entity.companyRoleId,
      companyPermissionId: entity.companyPermissionId,
      createdAt: entity.createdAt,
    };
  }
} 