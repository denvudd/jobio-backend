import { Inject, Injectable } from '@nestjs/common';

import { IGetAllCategoriesUseCase } from '~modules/categories/application/use-cases/categories/get-all-categories/get-all-categories-use-case.interface';
import { CategoriesDiToken } from '~modules/categories/constants';
import { Category } from '~modules/categories/domain/entities/category.entity';
import { ICategoryRepository } from '~modules/categories/domain/repositories/category-repository.interface';
import { PaginationQueryDto } from '~shared/application/dto/pagination.dto';

import { PaginatedQuery } from '~shared/application/CQS/paginated-query.abstract';

@Injectable()
export class GetAllCategoriesUseCase
  extends PaginatedQuery<PaginationQueryDto, Category>
  implements IGetAllCategoriesUseCase
{
  constructor(
    @Inject(CategoriesDiToken.CATEGORY_REPOSITORY)
    private readonly categoryRepository: ICategoryRepository,
  ) {
    super();
  }

  protected async getItems(input: PaginationQueryDto): Promise<Category[]> {
    return this.categoryRepository.findAll(input);
  }

  protected async getTotal(input: PaginationQueryDto): Promise<number> {
    return this.categoryRepository.count();
  }

  protected getBaseUrl(input: PaginationQueryDto): string {
    return '/categories';
  }
} 