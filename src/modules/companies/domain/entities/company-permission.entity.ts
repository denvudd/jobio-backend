import { Builder } from 'builder-pattern';

export class CompanyPermission {
  public readonly id: string;
  public readonly name: string;
  public readonly description?: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public static builder(name: string) {
    return Builder(CompanyPermission, {
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
} 