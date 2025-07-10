import { Inject, Injectable } from '@nestjs/common';

import { IGetAllCategoriesUseCase } from '~modules/categories/application/use-cases/categories/get-all-categories/get-all-categories-use-case.interface';
import { CategoriesDiToken } from '~modules/categories/constants';
import { Category } from '~modules/categories/domain/entities/category.entity';
import { ICategoryRepository } from '~modules/categories/domain/repositories/category-repository.interface';

import { Query } from '~shared/application/CQS/query.abstract';

// TODO: Add pagination
@Injectable()
export class GetAllCategoriesUseCase extends Query<null, Category[]> implements IGetAllCategoriesUseCase {
  constructor(
    @Inject(CategoriesDiToken.CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) {
    super();
  }

  protected async implementation(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }
}
