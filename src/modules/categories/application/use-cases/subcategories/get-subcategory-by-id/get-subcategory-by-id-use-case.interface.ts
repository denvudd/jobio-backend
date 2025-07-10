import { SubCategory } from '~modules/categories/domain/entities/subcategory.entity';

import { Query } from '~shared/application/CQS/query.abstract';

export interface IGetSubcategoryByIdUseCase extends Query<{ id: string }, SubCategory> {}