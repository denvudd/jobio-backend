import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { POSTGRES_DB } from '~lib/drizzle-postgres';
import { UserDetails } from '~modules/profiles/domain/entities/user-details.entity';
import {
  IUserDetailsDataAccess,
  UserDetailsMapper,
} from '~modules/profiles/domain/mappers/user-details/user-details.mapper';
import { IUserDetailsRepository } from '~modules/profiles/domain/repositories/user-details-repository.interface';
import { UserRole } from '~shared/domain/enums/user-role.enum';
import { IDataAccessMapper } from '~shared/domain/mappers';
import {
  DrizzleRepository,
  TableDefinition,
} from '~shared/infrastructure/database/drizzle/repository/drizzle.repository';
import { userDetails } from '~shared/infrastructure/database/drizzle/schema/public-database-schema';

@Injectable()
export class DrizzleUserDetailsRepository
  extends DrizzleRepository<UserDetails, TableDefinition<typeof userDetails>, IUserDetailsDataAccess>
  implements IUserDetailsRepository
{
  constructor(
    @Inject(POSTGRES_DB) db: NodePgDatabase<any>,
    @Inject(UserDetailsMapper) mapper: IDataAccessMapper<UserDetails, IUserDetailsDataAccess>,
  ) {
    super(TableDefinition.create(userDetails, 'id'), db, mapper);
  }

  async findByUserId(userId: string): Promise<UserDetails | null> {
    const [result] = await this.db.select().from(userDetails).where(eq(userDetails.userId, userId)).limit(1);

    if (!result) return null;
    return this.mapper.toDomain(result as IUserDetailsDataAccess);
  }

  async findByRole(role: UserRole): Promise<UserDetails[]> {
    const results = await this.db.select().from(userDetails).where(eq(userDetails.role, role));

    return results.map((result) => this.mapper.toDomain(result as IUserDetailsDataAccess));
  }
}
