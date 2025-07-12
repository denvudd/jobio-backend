import { CompanyRole } from '~modules/companies/domain/entities/company-role.entity';

import { IDataAccessMapper } from '~shared/domain/mappers';

export interface ICompanyRoleDataAccess {
  id: string;
  name: string;
  description: string | null;
  isDefault: boolean;
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class CompanyRoleMapper implements IDataAccessMapper<CompanyRole, ICompanyRoleDataAccess> {
  toDomain(persistence: ICompanyRoleDataAccess): CompanyRole {
    return CompanyRole.builder(persistence.name)
      .id(persistence.id)
      .description(persistence.description)
      .isDefault(persistence.isDefault)
      .isSystem(persistence.isSystem)
      .createdAt(persistence.createdAt)
      .updatedAt(persistence.updatedAt)
      .build();
  }

  toPersistence(entity: CompanyRole): ICompanyRoleDataAccess {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      isDefault: entity.isDefault,
      isSystem: entity.isSystem,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
} 