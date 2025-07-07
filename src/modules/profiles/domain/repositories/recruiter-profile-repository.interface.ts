import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

import { RecruiterProfile } from '../entities/recruiter-profile.entity';

export interface IRecruiterProfileRepository extends IBaseRepository<RecruiterProfile, string> {
  findByUserDetailsId(userDetailsId: string): Promise<RecruiterProfile | null>;
  findByCompany(company: string): Promise<RecruiterProfile[]>;
} 