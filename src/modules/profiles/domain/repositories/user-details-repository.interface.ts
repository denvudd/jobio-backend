import { UserDetails } from '~modules/profiles/domain/entities/user-details.entity';

import { UserRole } from '~shared/domain/enums/user-role.enum';
import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

export interface IUserDetailsRepository extends IBaseRepository<UserDetails, string> {
  findByUserId(userId: string): Promise<UserDetails | null>;
  findByRole(role: UserRole): Promise<UserDetails[]>;
}
