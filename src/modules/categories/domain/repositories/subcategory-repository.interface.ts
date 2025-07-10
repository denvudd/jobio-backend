import { SubCategory } from '~modules/categories/domain/entities/subcategory.entity';

import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

export interface ISubCategoryRepository extends IBaseRepository<SubCategory, string> {
  findByName(name: string): Promise<SubCategory | null>;
  findByCategoryId(categoryId: string): Promise<SubCategory[]>;
  findAll(): Promise<SubCategory[]>;
}