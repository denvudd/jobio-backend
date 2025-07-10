import { SubCategory } from '~modules/categories/domain/entities/subcategory.entity';

import { Query } from '~shared/application/CQS/query.abstract';

// TODO: Add pagination
export interface IGetAllSubcategoriesUseCase extends Query<null, SubCategory[]> {}
