import { RecruiterProfile } from '~modules/profiles/domain/entities/recruiter-profile.entity';

import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

export interface IRecruiterProfileRepository extends IBaseRepository<RecruiterProfile, string> {
  findByUserDetailsId(userDetailsId: string): Promise<RecruiterProfile | null>;
  findByCompany(company: string): Promise<RecruiterProfile[]>;
}
