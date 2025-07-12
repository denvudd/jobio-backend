import { CompanyRolePermission } from '~modules/companies/domain/entities/company-role-permission.entity';

import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

export interface ICompanyRolePermissionRepository extends IBaseRepository<CompanyRolePermission, string> {
  assignPermissionToRole(roleId: string, permissionId: string): Promise<void>;
  removePermissionFromRole(roleId: string, permissionId: string): Promise<void>;
  getPermissionsByRoleId(roleId: string): Promise<string[]>;
  hasPermission(roleId: string, permissionId: string): Promise<boolean>;
} 