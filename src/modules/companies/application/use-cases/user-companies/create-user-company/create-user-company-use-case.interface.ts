import { CreateUserCompanyDto } from '../../../dto/create-user-company.dto';

import { IUseCase } from '~shared/application/use-cases/use-case.interface';

import { UserCompany } from '~modules/companies/domain/entities/user-company.entity';

export interface ICreateUserCompanyUseCase extends IUseCase<CreateUserCompanyDto, UserCompany> {} 