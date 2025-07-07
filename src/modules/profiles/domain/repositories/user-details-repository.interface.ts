import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

import { UserDetails } from '../entities/user-details.entity';
import { UserRole } from '~shared/domain/enums/user-role.enum';

export interface IUserDetailsRepository extends IBaseRepository<UserDetails, string> {
  findByUserId(userId: string): Promise<UserDetails | null>;
  findByRole(role: UserRole): Promise<UserDetails[]>;
} 