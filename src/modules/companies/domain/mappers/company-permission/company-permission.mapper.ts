import { CompanyPermission } from '~modules/companies/domain/entities/company-permission.entity';

import { IDataAccessMapper } from '~shared/domain/mappers';

export interface ICompanyPermissionDataAccess {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class CompanyPermissionMapper implements IDataAccessMapper<CompanyPermission, ICompanyPermissionDataAccess> {
  toDomain(persistence: ICompanyPermissionDataAccess): CompanyPermission {
    return CompanyPermission.builder(persistence.name)
      .id(persistence.id)
      .description(persistence.description)
      .createdAt(persistence.createdAt)
      .updatedAt(persistence.updatedAt)
      .build();
  }

  toPersistence(entity: CompanyPermission): ICompanyPermissionDataAccess {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
} 