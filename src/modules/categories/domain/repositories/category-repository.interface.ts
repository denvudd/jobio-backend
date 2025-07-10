import { Category } from '~modules/categories/domain/entities/category.entity';

import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

export interface ICategoryRepository extends IBaseRepository<Category, string> {
  findByName(name: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
}