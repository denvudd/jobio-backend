import { Builder } from 'builder-pattern';

export class CompanyRole {
  public readonly id: string;
  public readonly name: string;
  public readonly description?: string;
  public readonly isDefault: boolean;
  public readonly isSystem: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public static builder(name: string) {
    return Builder(CompanyRole, {
      name,
      isDefault: false,
      isSystem: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
} 