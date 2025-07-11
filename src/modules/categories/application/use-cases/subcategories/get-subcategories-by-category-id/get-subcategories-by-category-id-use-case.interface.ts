import { SubCategory } from '~modules/categories/domain/entities/subcategory.entity';
import { PaginationQueryDto } from '~shared/application/dto/pagination.dto';
import { PaginationResult } from '~shared/application/models/pagination.model';

import { Query } from '~shared/application/CQS/query.abstract';

export interface GetSubcategoriesByCategoryIdInput extends PaginationQueryDto {
  categoryId: string;
}

export interface IGetSubcategoriesByCategoryIdUseCase extends Query<GetSubcategoriesByCategoryIdInput, PaginationResult<SubCategory>> {} 