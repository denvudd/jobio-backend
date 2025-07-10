import { Builder } from 'builder-pattern';

export class SubCategory {
  public readonly id: string;
  public readonly name: string;
  public readonly categoryId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public static builder(name: string, categoryId: string) {
    return Builder(SubCategory, {
      name,
      categoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
