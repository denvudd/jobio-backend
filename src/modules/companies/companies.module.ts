import { Module, forwardRef } from '@nestjs/common';

import { CreateCompanyUseCase } from '~modules/companies/application/use-cases/companies/create-company/create-company.use-case';
import { RunCompanyPermissionSeedsUseCase } from '~modules/companies/application/use-cases/seeds/run-company-permission-seeds';
import { RunCompanyRolePermissionSeedsUseCase } from '~modules/companies/application/use-cases/seeds/run-company-role-permission-seeds';
import { RunCompanyRoleSeedsUseCase } from '~modules/companies/application/use-cases/seeds/run-company-role-seeds';
import { RunCompanySeedsUseCase } from '~modules/companies/application/use-cases/seeds/run-company-seeds/run-company-seeds.use-case';
import { CreateUserCompanyUseCase } from '~modules/companies/application/use-cases/user-companies/create-user-company/create-user-company.use-case';
import { CompaniesDiToken } from '~modules/companies/constants';
import { CompanyPermissionMapper } from '~modules/companies/domain/mappers/company-permission/company-permission.mapper';
import { CompanyRolePermissionMapper } from '~modules/companies/domain/mappers/company-role-permission/company-role-permission.mapper';
import { CompanyRoleMapper } from '~modules/companies/domain/mappers/company-role/company-role.mapper';
import { CompanyMapper } from '~modules/companies/domain/mappers/company/company.mapper';
import { UserCompanyMapper } from '~modules/companies/domain/mappers/user-company/user-company.mapper';
import { RecruiterProfileCreatedEventHandler } from '~modules/companies/infrastructure/event-handlers/recruiter-profile-created.event-handler';
import { DrizzleCompanyPermissionRepository } from '~modules/companies/infrastructure/persistence/drizzle/repositories/drizzle-company-permission.repository';
import { DrizzleCompanyRolePermissionRepository } from '~modules/companies/infrastructure/persistence/drizzle/repositories/drizzle-company-role-permission.repository';
import { DrizzleCompanyRoleRepository } from '~modules/companies/infrastructure/persistence/drizzle/repositories/drizzle-company-role.repository';
import { DrizzleCompanyRepository } from '~modules/companies/infrastructure/persistence/drizzle/repositories/drizzle-company.repository';
import { DrizzleUserCompanyRepository } from '~modules/companies/infrastructure/persistence/drizzle/repositories/drizzle-user-company.repository';

import { SharedModule } from '~shared/shared.module';

@Module({
  imports: [forwardRef(() => SharedModule)],
  providers: [
    {
      provide: CompaniesDiToken.RUN_COMPANY_SEEDS_USE_CASE,
      useClass: RunCompanySeedsUseCase,
    },
    {
      provide: CompaniesDiToken.RUN_COMPANY_PERMISSION_SEEDS_USE_CASE,
      useClass: RunCompanyPermissionSeedsUseCase,
    },
    {
      provide: CompaniesDiToken.RUN_COMPANY_ROLE_SEEDS_USE_CASE,
      useClass: RunCompanyRoleSeedsUseCase,
    },
    {
      provide: CompaniesDiToken.RUN_COMPANY_ROLE_PERMISSION_SEEDS_USE_CASE,
      useClass: RunCompanyRolePermissionSeedsUseCase,
    },
    {
      provide: CompaniesDiToken.CREATE_COMPANY_USE_CASE,
      useClass: CreateCompanyUseCase,
    },
    {
      provide: CompaniesDiToken.CREATE_USER_COMPANY_USE_CASE,
      useClass: CreateUserCompanyUseCase,
    },
    CompanyMapper,
    CompanyPermissionMapper,
    CompanyRoleMapper,
    CompanyRolePermissionMapper,
    UserCompanyMapper,
    {
      provide: CompaniesDiToken.COMPANY_REPOSITORY,
      useClass: DrizzleCompanyRepository,
    },
    {
      provide: CompaniesDiToken.COMPANY_PERMISSION_REPOSITORY,
      useClass: DrizzleCompanyPermissionRepository,
    },
    {
      provide: CompaniesDiToken.COMPANY_ROLE_REPOSITORY,
      useClass: DrizzleCompanyRoleRepository,
    },
    {
      provide: CompaniesDiToken.COMPANY_ROLE_PERMISSION_REPOSITORY,
      useClass: DrizzleCompanyRolePermissionRepository,
    },
    {
      provide: CompaniesDiToken.USER_COMPANY_REPOSITORY,
      useClass: DrizzleUserCompanyRepository,
    },
    RecruiterProfileCreatedEventHandler,
  ],
  exports: [
    CompaniesDiToken.RUN_COMPANY_SEEDS_USE_CASE,
    CompaniesDiToken.RUN_COMPANY_PERMISSION_SEEDS_USE_CASE,
    CompaniesDiToken.RUN_COMPANY_ROLE_SEEDS_USE_CASE,
    CompaniesDiToken.RUN_COMPANY_ROLE_PERMISSION_SEEDS_USE_CASE,
    CompaniesDiToken.CREATE_COMPANY_USE_CASE,
    CompaniesDiToken.CREATE_USER_COMPANY_USE_CASE,
  ],
})
export class CompaniesModule {}
