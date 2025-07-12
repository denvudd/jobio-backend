import { Builder } from 'builder-pattern';

export class Company {
  public readonly id: string;
  public readonly name: string;
  public readonly description?: string;
  public readonly website?: string;
  public readonly logo?: string;
  public readonly industry?: string;
  public readonly size?: string;
  public readonly location?: string;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public static builder(name: string) {
    return Builder(Company, {
      name,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
} 