import { UserDetails } from '~modules/profiles/domain/entities/user-details.entity';

import { UserRole } from '~shared/domain/enums/user-role.enum';
import { IDataAccessMapper } from '~shared/domain/mappers/data-access-mapper.interface';

export interface IUserDetailsDataAccess {
  id: string;
  userId: string;
  fullName: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserDetailsMapper implements IDataAccessMapper<UserDetails, IUserDetailsDataAccess> {
  toDomain(persistence: IUserDetailsDataAccess): UserDetails {
    return UserDetails.builder(persistence.id, persistence.userId, persistence.role as UserRole)
      .fullName(persistence.fullName)
      .createdAt(persistence.createdAt)
      .updatedAt(persistence.updatedAt)
      .build();
  }

  toPersistence(entity: UserDetails): IUserDetailsDataAccess {
    return {
      id: entity.id,
      userId: entity.userId,
      fullName: entity.fullName || null,
      role: entity.role,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
