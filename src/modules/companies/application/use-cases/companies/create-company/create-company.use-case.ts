import { Inject, Injectable } from '@nestjs/common';

import { CreateCompanyDto } from '../../../dto/create-company.dto';
import { ICreateCompanyUseCase } from './create-company-use-case.interface';
import { CompaniesDiToken } from '~modules/companies/constants';
import { Company } from '~modules/companies/domain/entities/company.entity';
import { ICompanyRepository } from '~modules/companies/domain/repositories/company-repository.interface';

import { Command } from '~shared/application/CQS/command.abstract';

@Injectable()
export class CreateCompanyUseCase extends Command<CreateCompanyDto, Company> implements ICreateCompanyUseCase {
  constructor(
    @Inject(CompaniesDiToken.COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {
    super();
  }

  protected async implementation(): Promise<Company> {
    const { name, description, website, logo, industry, size, location } = this._input;

    const company = Company.builder(name)
      .description(description)
      .website(website)
      .logo(logo)
      .industry(industry)
      .size(size)
      .location(location)
      .build();

    return await this.companyRepository.create(company);
  }
} 