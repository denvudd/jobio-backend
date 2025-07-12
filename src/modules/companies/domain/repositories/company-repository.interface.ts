import { Company } from '~modules/companies/domain/entities/company.entity';

import { IBaseRepository } from '~shared/domain/repositories/base-repository.interface';

export interface ICompanyRepository extends IBaseRepository<Company, string> {
} 