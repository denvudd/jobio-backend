import { Inject, Injectable } from '@nestjs/common';

import { EventsHandler } from '~lib/nest-event-driven';

import { InvalidRoleException } from '~modules/companies/application/exceptions/invalid-role.exception';
import { ICreateCompanyUseCase } from '~modules/companies/application/use-cases/companies/create-company/create-company-use-case.interface';
import { ICreateUserCompanyUseCase } from '~modules/companies/application/use-cases/user-companies/create-user-company/create-user-company-use-case.interface';
import { CompaniesDiToken } from '~modules/companies/constants';
import { CompanyRoleType } from '~modules/companies/domain/enums/company-management.enum';
import { ICompanyRoleRepository } from '~modules/companies/domain/repositories/company-role-repository.interface';
import { RecruiterProfileCreatedEvent } from '~modules/profiles/domain/events/recruiter-profile-created.event';

@Injectable()
@EventsHandler(RecruiterProfileCreatedEvent)
export class RecruiterProfileCreatedEventHandler {
  constructor(
    @Inject(CompaniesDiToken.CREATE_COMPANY_USE_CASE)
    private readonly createCompanyUseCase: ICreateCompanyUseCase,
    @Inject(CompaniesDiToken.CREATE_USER_COMPANY_USE_CASE)
    private readonly createUserCompanyUseCase: ICreateUserCompanyUseCase,
    @Inject(CompaniesDiToken.COMPANY_ROLE_REPOSITORY)
    private readonly companyRoleRepository: ICompanyRoleRepository,
  ) {}

  async handle(event: RecruiterProfileCreatedEvent): Promise<void> {
    const { userId, recruiterProfileId } = event.payload;

    const defaultCompany = await this.createCompanyUseCase.execute({
      name: `Company of ${userId}`,
      description: 'Default company created during registration',
    });

    const adminRole = await this.companyRoleRepository.findByName(CompanyRoleType.ADMIN);

    if (!adminRole) {
      throw new InvalidRoleException(`${CompanyRoleType.ADMIN} role not found in database`);
    }

    await this.createUserCompanyUseCase.execute({
      recruiterProfileId,
      companyId: defaultCompany.id,
      companyRoleId: adminRole.id,
    });
  }
}
