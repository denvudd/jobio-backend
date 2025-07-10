import { SubCategory } from '~modules/categories/domain/entities/subcategory.entity';

import { IDataAccessMapper } from '~shared/domain/mappers';

export interface ISubCategoryDataAccess {
  id: string;
  name: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class SubCategoryMapper implements IDataAccessMapper<SubCategory, ISubCategoryDataAccess> {
  toDomain(persistence: ISubCategoryDataAccess): SubCategory {
    return SubCategory.builder(persistence.name, persistence.categoryId)
      .createdAt(persistence.createdAt)
      .updatedAt(persistence.updatedAt)
      .build();
  }

  toPersistence(entity: SubCategory): ISubCategoryDataAccess {
    return {
      id: entity.id,
      name: entity.name,
      categoryId: entity.categoryId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
