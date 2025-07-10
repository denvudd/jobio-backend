import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { POSTGRES_DB } from '~lib/drizzle-postgres';

import { SubCategory } from '~modules/categories/domain/entities/subcategory.entity';
import {
  ISubCategoryDataAccess,
  SubCategoryMapper,
} from '~modules/categories/domain/mappers/subcategory/subcategory.mapper';
import { ISubCategoryRepository } from '~modules/categories/domain/repositories/subcategory-repository.interface';

import { IDataAccessMapper } from '~shared/domain/mappers';
import {
  DrizzleRepository,
  TableDefinition,
} from '~shared/infrastructure/database/drizzle/repository/drizzle.repository';
import { MergedDbSchema } from '~shared/infrastructure/database/drizzle/schema';
import { subCategory } from '~shared/infrastructure/database/drizzle/schema/public-database-schema';

@Injectable()
export class DrizzleSubCategoryRepository
  extends DrizzleRepository<SubCategory, TableDefinition<typeof subCategory>, ISubCategoryDataAccess>
  implements ISubCategoryRepository
{
  constructor(
    @Inject(POSTGRES_DB) db: NodePgDatabase<MergedDbSchema>,
    @Inject(SubCategoryMapper) mapper: IDataAccessMapper<SubCategory, ISubCategoryDataAccess>,
  ) {
    super(TableDefinition.create(subCategory, 'id'), db, mapper);
  }

  public async findAll(): Promise<SubCategory[]> {
    const result = await this.db.select().from(subCategory);

    return result.map((item) => this.mapper.toDomain(item));
  }

  public async findByName(name: string): Promise<SubCategory | null> {
    const [result] = await this.db.select().from(subCategory).where(eq(subCategory.name, name)).limit(1);

    if (!result) return null;

    return this.mapper.toDomain(result);
  }

  public async findByCategoryId(categoryId: string): Promise<SubCategory[]> {
    const result = await this.db.select().from(subCategory).where(eq(subCategory.categoryId, categoryId));

    return result.map((item) => this.mapper.toDomain(item));
  }
}
