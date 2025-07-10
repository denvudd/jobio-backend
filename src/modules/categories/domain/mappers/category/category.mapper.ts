import { Category } from '~modules/categories/domain/entities/category.entity';

import { IDataAccessMapper } from '~shared/domain/mappers';

export interface ICategoryDataAccess {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class CategoryMapper implements IDataAccessMapper<Category, ICategoryDataAccess> {
  toDomain(persistence: ICategoryDataAccess): Category {
    return Category.builder(persistence.name)
      .id(persistence.id)
      .createdAt(persistence.createdAt)
      .updatedAt(persistence.updatedAt)
      .build();
  }

  toPersistence(entity: Category): ICategoryDataAccess {
    return {
      id: entity.id,
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
