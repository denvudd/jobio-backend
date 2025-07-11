import { Inject, Injectable } from '@nestjs/common';

import {
  GetSubcategoriesByCategoryIdInput,
  IGetSubcategoriesByCategoryIdUseCase,
} from '~modules/categories/application/use-cases/subcategories/get-subcategories-by-category-id/get-subcategories-by-category-id-use-case.interface';
import { CategoriesDiToken } from '~modules/categories/constants';
import { SubCategory } from '~modules/categories/domain/entities/subcategory.entity';
import { ISubCategoryRepository } from '~modules/categories/domain/repositories/subcategory-repository.interface';

import { PaginatedQuery } from '~shared/application/CQS/paginated-query.abstract';

@Injectable()
export class GetSubcategoriesByCategoryIdUseCase
  extends PaginatedQuery<GetSubcategoriesByCategoryIdInput, SubCategory>
  implements IGetSubcategoriesByCategoryIdUseCase
{
  constructor(
    @Inject(CategoriesDiToken.SUB_CATEGORY_REPOSITORY)
    private readonly subCategoryRepository: ISubCategoryRepository,
  ) {
    super();
  }

  protected async getItems(input: GetSubcategoriesByCategoryIdInput): Promise<SubCategory[]> {
    return this.subCategoryRepository.findByCategoryId(input.categoryId, input);
  }

  protected async getTotal(input: GetSubcategoriesByCategoryIdInput): Promise<number> {
    return this.subCategoryRepository.countByCategoryId(input.categoryId);
  }

  protected getBaseUrl(input: GetSubcategoriesByCategoryIdInput): string {
    return `/subcategories/by-category/${input.categoryId}`;
  }
}
