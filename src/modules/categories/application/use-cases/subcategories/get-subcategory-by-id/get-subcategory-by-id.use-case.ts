import { Inject, Injectable } from '@nestjs/common';

import { EntityNotFoundByIdException } from '~modules/categories/application/exceptions/not-found-by-id.exception';
import { IGetSubcategoryByIdUseCase } from '~modules/categories/application/use-cases/subcategories/get-subcategory-by-id/get-subcategory-by-id-use-case.interface';
import { CategoriesDiToken } from '~modules/categories/constants';
import { SubCategory } from '~modules/categories/domain/entities/subcategory.entity';
import { ISubCategoryRepository } from '~modules/categories/domain/repositories/subcategory-repository.interface';

import { Query } from '~shared/application/CQS/query.abstract';

@Injectable()
export class GetSubcategoryByIdUseCase
  extends Query<{ id: string }, SubCategory>
  implements IGetSubcategoryByIdUseCase
{
  constructor(
    @Inject(CategoriesDiToken.SUB_CATEGORY_REPOSITORY)
    private readonly subcategoryRepository: ISubCategoryRepository,
  ) {
    super();
  }

  protected async implementation(): Promise<SubCategory> {
    const { id } = this._input;

    const subcategory = await this.subcategoryRepository.findById(id);

    if (!subcategory) {
      throw new EntityNotFoundByIdException('subcategory', id);
    }

    return subcategory;
  }
}
