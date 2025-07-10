import { Category } from '~modules/categories/domain/entities/category.entity';

import { Query } from '~shared/application/CQS/query.abstract';

export interface IGetCategoryByNameUseCase extends Query<{ name: string }, Category> {}
