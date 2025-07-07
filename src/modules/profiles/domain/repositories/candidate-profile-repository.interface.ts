import { CandidateProfile } from '~modules/profiles/domain/entities/candidate-profile.entity';

import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

export interface ICandidateProfileRepository extends IBaseRepository<CandidateProfile, string> {
  findByUserDetailsId(userDetailsId: string): Promise<CandidateProfile | null>;
  findByPosition(position: string): Promise<CandidateProfile[]>;
  findBySkills(skills: string[]): Promise<CandidateProfile[]>;
}
