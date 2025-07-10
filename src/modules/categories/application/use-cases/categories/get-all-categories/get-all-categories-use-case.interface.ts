import { Category } from '~modules/categories/domain/entities/category.entity';

import { Query } from '~shared/application/CQS/query.abstract';

// TODO: Add pagination
export interface IGetAllCategoriesUseCase extends Query<null, Category[]> {}
