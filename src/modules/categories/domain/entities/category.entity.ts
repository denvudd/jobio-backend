import { Builder } from 'builder-pattern';

export class Category {
  public readonly id: string;
  public readonly name: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  public static builder(name: string) {
    return Builder(Category, {
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
