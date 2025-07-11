import { Category } from '~modules/categories/domain/entities/category.entity';
import { PaginationQueryDto } from '~shared/application/dto/pagination.dto';
import { PaginationResult } from '~shared/application/models/pagination.model';

import { Query } from '~shared/application/CQS/query.abstract';

export interface IGetAllCategoriesUseCase extends Query<PaginationQueryDto, PaginationResult<Category>> {} 