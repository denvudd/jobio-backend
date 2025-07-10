import { Inject, Injectable } from '@nestjs/common';

import { EntityNotFoundByNameException } from '~modules/categories/application/exceptions/not-found-by-name.exception';
import { IGetSubcategoryByNameUseCase } from '~modules/categories/application/use-cases/subcategories/get-subcategory-by-name/get-subcategory-by-name-use-case.interface';
import { CategoriesDiToken } from '~modules/categories/constants';
import { SubCategory } from '~modules/categories/domain/entities/subcategory.entity';
import { ISubCategoryRepository } from '~modules/categories/domain/repositories/subcategory-repository.interface';

import { Query } from '~shared/application/CQS/query.abstract';

@Injectable()
export class GetSubcategoryByNameUseCase
  extends Query<{ name: string }, SubCategory>
  implements IGetSubcategoryByNameUseCase
{
  constructor(
    @Inject(CategoriesDiToken.SUB_CATEGORY_REPOSITORY)
    private readonly subcategoryRepository: ISubCategoryRepository,
  ) {
    super();
  }

  protected async implementation(): Promise<SubCategory> {
    const { name } = this._input;

    const subcategory = await this.subcategoryRepository.findByName(name);

    if (!subcategory) {
      throw new EntityNotFoundByNameException('subcategory', name);
    }

    return subcategory;
  }
}
