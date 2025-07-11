import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { POSTGRES_DB } from '~lib/drizzle-postgres';

import { Category } from '~modules/categories/domain/entities/category.entity';
import { CategoryMapper, ICategoryDataAccess } from '~modules/categories/domain/mappers/category/category.mapper';
import { ICategoryRepository } from '~modules/categories/domain/repositories/category-repository.interface';

import { PaginationQueryDto } from '~shared/application/dto/pagination.dto';
import { IDataAccessMapper } from '~shared/domain/mappers';
import {
  DrizzleRepository,
  TableDefinition,
} from '~shared/infrastructure/database/drizzle/repository/drizzle.repository';
import { MergedDbSchema } from '~shared/infrastructure/database/drizzle/schema';
import { category } from '~shared/infrastructure/database/drizzle/schema/public-database-schema';

@Injectable()
export class DrizzleCategoryRepository
  extends DrizzleRepository<Category, TableDefinition<typeof category>, ICategoryDataAccess>
  implements ICategoryRepository
{
  constructor(
    @Inject(POSTGRES_DB) db: NodePgDatabase<MergedDbSchema>,
    @Inject(CategoryMapper) mapper: IDataAccessMapper<Category, ICategoryDataAccess>,
  ) {
    super(TableDefinition.create(category, 'id'), db, mapper);
  }

  public async findAll(query: PaginationQueryDto): Promise<Category[]> {
    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const result = await this.db.select().from(category).limit(limit).offset(offset);

    return result.map((item) => this.mapper.toDomain(item));
  }

  public async findByName(name: string): Promise<Category | null> {
    const [result] = await this.db.select().from(category).where(eq(category.name, name)).limit(1);

    if (!result) return null;

    return this.mapper.toDomain(result);
  }

  public async count(): Promise<number> {
    const result = await this.db.select().from(category);
    return result.length;
  }
}
