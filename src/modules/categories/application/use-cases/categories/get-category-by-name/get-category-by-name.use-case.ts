import { Inject, Injectable } from '@nestjs/common';

import { EntityNotFoundByNameException } from '~modules/categories/application/exceptions/not-found-by-name.exception';
import { IGetCategoryByNameUseCase } from '~modules/categories/application/use-cases/categories/get-category-by-name/get-category-by-name-use-case.interface';
import { CategoriesDiToken } from '~modules/categories/constants';
import { Category } from '~modules/categories/domain/entities/category.entity';
import { ICategoryRepository } from '~modules/categories/domain/repositories/category-repository.interface';

import { Query } from '~shared/application/CQS/query.abstract';

@Injectable()
export class GetCategoryByNameUseCase extends Query<{ name: string }, Category> implements IGetCategoryByNameUseCase {
  constructor(@Inject(CategoriesDiToken.CATEGORY_REPOSITORY) private readonly categoryRepository: ICategoryRepository) {
    super();
  }

  protected async implementation(): Promise<Category> {
    const { name } = this._input;

    const category = await this.categoryRepository.findByName(name);

    if (!category) {
      throw new EntityNotFoundByNameException('category', name);
    }

    return this.categoryRepository.findByName(name);
  }
}
