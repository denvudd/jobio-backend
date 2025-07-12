import { CompanyPermission } from '~modules/companies/domain/entities/company-permission.entity';

import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

export interface ICompanyPermissionRepository extends IBaseRepository<CompanyPermission, string> {
  findAll(): Promise<CompanyPermission[]>;
} 