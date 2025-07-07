import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

import { CandidateProfile } from '../entities/candidate-profile.entity';

export interface ICandidateProfileRepository extends IBaseRepository<CandidateProfile, string> {
  findByUserDetailsId(userDetailsId: string): Promise<CandidateProfile | null>;
  findByPosition(position: string): Promise<CandidateProfile[]>;
  findBySkills(skills: string[]): Promise<CandidateProfile[]>;
} 