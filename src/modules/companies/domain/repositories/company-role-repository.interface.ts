import { CompanyRole } from '~modules/companies/domain/entities/company-role.entity';

import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

export interface ICompanyRoleRepository extends IBaseRepository<CompanyRole, string> {
  findAll(): Promise<CompanyRole[]>;
  deleteAll(): Promise<void>;
} 