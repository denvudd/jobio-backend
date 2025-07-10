import { Inject, Injectable } from '@nestjs/common';

import { IGetAllSubcategoriesUseCase } from '~modules/categories/application/use-cases/subcategories/get-all-subcategories/get-all-subcategories-use-case.interface';
import { CategoriesDiToken } from '~modules/categories/constants';
import { SubCategory } from '~modules/categories/domain/entities/subcategory.entity';
import { ISubCategoryRepository } from '~modules/categories/domain/repositories/subcategory-repository.interface';

import { Query } from '~shared/application/CQS/query.abstract';

@Injectable()
export class GetAllSubcategoriesUseCase extends Query<null, SubCategory[]> implements IGetAllSubcategoriesUseCase {
  constructor(
    @Inject(CategoriesDiToken.SUB_CATEGORY_REPOSITORY)
    private readonly subcategoryRepository: ISubCategoryRepository,
  ) {
    super();
  }

  protected async implementation(): Promise<SubCategory[]> {
    return this.subcategoryRepository.findAll();
  }
}