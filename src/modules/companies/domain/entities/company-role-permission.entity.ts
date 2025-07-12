import { Builder } from 'builder-pattern';

export class CompanyRolePermission {
  public readonly id: string;
  public readonly companyRoleId: string;
  public readonly companyPermissionId: string;
  public readonly createdAt: Date;

  public static builder(companyRoleId: string, companyPermissionId: string) {
    return Builder(CompanyRolePermission, {
      companyRoleId,
      companyPermissionId,
      createdAt: new Date(),
    });
  }
} 