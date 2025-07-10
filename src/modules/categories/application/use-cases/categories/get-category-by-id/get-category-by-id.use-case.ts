import { Inject, Injectable } from '@nestjs/common';

import { EntityNotFoundByIdException } from '~modules/categories/application/exceptions/not-found-by-id.exception';
import { IGetCategoryByIdUseCase } from '~modules/categories/application/use-cases/categories/get-category-by-id/get-category-by-id-use-case.interface';
import { CategoriesDiToken } from '~modules/categories/constants';
import { Category } from '~modules/categories/domain/entities/category.entity';
import { ICategoryRepository } from '~modules/categories/domain/repositories/category-repository.interface';

import { Query } from '~shared/application/CQS/query.abstract';

@Injectable()
export class GetCategoryByIdUseCase extends Query<{ id: string }, Category> implements IGetCategoryByIdUseCase {
  constructor(@Inject(CategoriesDiToken.CATEGORY_REPOSITORY) private readonly categoryRepository: ICategoryRepository) {
    super();
  }

  protected async implementation(): Promise<Category> {
    const { id } = this._input;

    const category = await this.categoryRepository.findById(id);

    if (!category) {
      throw new EntityNotFoundByIdException('category', id);
    }

    return this.categoryRepository.findById(id);
  }
}
