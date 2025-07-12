import { UserCompany } from '~modules/companies/domain/entities/user-company.entity';

import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

export interface IUserCompanyRepository extends IBaseRepository<UserCompany, string> {
  findByRecruiterProfileId(recruiterProfileId: string): Promise<UserCompany[]>;
  findByCompanyId(companyId: string): Promise<UserCompany[]>;
  findByRecruiterProfileIdAndCompanyId(recruiterProfileId: string, companyId: string): Promise<UserCompany | null>;
} 