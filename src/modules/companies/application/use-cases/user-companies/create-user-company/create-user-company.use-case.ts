import { Inject, Injectable } from '@nestjs/common';

import { CreateUserCompanyDto } from '../../../dto/create-user-company.dto';
import { ICreateUserCompanyUseCase } from './create-user-company-use-case.interface';
import { CompaniesDiToken } from '~modules/companies/constants';
import { UserCompany } from '~modules/companies/domain/entities/user-company.entity';
import { IUserCompanyRepository } from '~modules/companies/domain/repositories/user-company-repository.interface';

import { Command } from '~shared/application/CQS/command.abstract';

@Injectable()
export class CreateUserCompanyUseCase extends Command<CreateUserCompanyDto, UserCompany> implements ICreateUserCompanyUseCase {
  constructor(
    @Inject(CompaniesDiToken.USER_COMPANY_REPOSITORY)
    private readonly userCompanyRepository: IUserCompanyRepository,
  ) {
    super();
  }

  protected async implementation(): Promise<UserCompany> {
    const { recruiterProfileId, companyId, companyRoleId } = this._input;

    const userCompany = UserCompany.builder(recruiterProfileId, companyId, companyRoleId).build();

    return await this.userCompanyRepository.create(userCompany);
  }
} 