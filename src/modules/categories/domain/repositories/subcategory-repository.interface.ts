import { SubCategory } from '~modules/categories/domain/entities/subcategory.entity';
import { PaginationQueryDto } from '~shared/application/dto/pagination.dto';

import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

export interface ISubCategoryRepository extends IBaseRepository<SubCategory, string> {
  findByName(name: string): Promise<SubCategory | null>;
  findByCategoryId(categoryId: string, query: PaginationQueryDto): Promise<SubCategory[]>;
  findAll(query: PaginationQueryDto): Promise<SubCategory[]>;
  count(): Promise<number>;
  countByCategoryId(categoryId: string): Promise<number>;
}