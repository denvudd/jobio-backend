import { Inject, Injectable } from '@nestjs/common';

import { IGetSubcategoriesByCategoryIdUseCase } from '~modules/categories/application/use-cases/subcategories/get-subcategories-by-category-id/get-subcategories-by-category-id-use-case.interface';
import { CategoriesDiToken } from '~modules/categories/constants';
import { SubCategory } from '~modules/categories/domain/entities/subcategory.entity';
import { ISubCategoryRepository } from '~modules/categories/domain/repositories/subcategory-repository.interface';

import { Query } from '~shared/application/CQS/query.abstract';

@Injectable()
export class GetSubcategoriesByCategoryIdUseCase
  extends Query<{ categoryId: string }, SubCategory[]>
  implements IGetSubcategoriesByCategoryIdUseCase
{
  constructor(
    @Inject(CategoriesDiToken.SUB_CATEGORY_REPOSITORY)
    private readonly subcategoryRepository: ISubCategoryRepository,
  ) {
    super();
  }

  protected async implementation(): Promise<SubCategory[]> {
    const { categoryId } = this._input;

    return this.subcategoryRepository.findByCategoryId(categoryId);
  }
}
