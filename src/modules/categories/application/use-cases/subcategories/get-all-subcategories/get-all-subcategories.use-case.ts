import { Inject, Injectable } from '@nestjs/common';

import { IGetAllSubcategoriesUseCase } from '~modules/categories/application/use-cases/subcategories/get-all-subcategories/get-all-subcategories-use-case.interface';
import { CategoriesDiToken } from '~modules/categories/constants';
import { SubCategory } from '~modules/categories/domain/entities/subcategory.entity';
import { ISubCategoryRepository } from '~modules/categories/domain/repositories/subcategory-repository.interface';
import { PaginationQueryDto } from '~shared/application/dto/pagination.dto';
import { PaginationResult } from '~shared/application/models/pagination.model';

import { PaginatedQuery } from '~shared/application/CQS/paginated-query.abstract';

@Injectable()
export class GetAllSubcategoriesUseCase
  extends PaginatedQuery<PaginationQueryDto, SubCategory>
  implements IGetAllSubcategoriesUseCase
{
  constructor(
    @Inject(CategoriesDiToken.SUB_CATEGORY_REPOSITORY)
    private readonly subCategoryRepository: ISubCategoryRepository,
  ) {
    super();
  }

  protected async getItems(input: PaginationQueryDto): Promise<SubCategory[]> {
    return this.subCategoryRepository.findAll(input);
  }

  protected async getTotal(input: PaginationQueryDto): Promise<number> {
    return this.subCategoryRepository.count();
  }

  protected getBaseUrl(input: PaginationQueryDto): string {
    return '/subcategories';
  }
} 