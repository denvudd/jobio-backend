import { Builder } from 'builder-pattern';

export class UserCompany {
  public readonly id: string;
  public readonly recruiterProfileId: string;
  public readonly companyId: string;
  public readonly companyRoleId: string;
  public readonly isActive: boolean;
  public readonly joinedAt: Date;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public static builder(recruiterProfileId: string, companyId: string, companyRoleId: string) {
    return Builder(UserCompany, {
      recruiterProfileId,
      companyId,
      companyRoleId,
      isActive: true,
      joinedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
} 