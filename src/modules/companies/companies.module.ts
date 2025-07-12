import { Module, forwardRef } from '@nestjs/common';

import { RunCompanySeedsUseCase } from '~modules/companies/application/use-cases/seeds/run-company-seeds/run-company-seeds.use-case';
import { RunCompanyPermissionSeedsUseCase } from '~modules/companies/application/use-cases/seeds/run-company-permission-seeds';
import { RunCompanyRoleSeedsUseCase } from '~modules/companies/application/use-cases/seeds/run-company-role-seeds';
import { RunCompanyRolePermissionSeedsUseCase } from '~modules/companies/application/use-cases/seeds/run-company-role-permission-seeds';
import { CompaniesDiToken } from '~modules/companies/constants';
import { CompanyPermissionMapper } from '~modules/companies/domain/mappers/company-permission';
import { CompanyRoleMapper } from '~modules/companies/domain/mappers/company-role';
import { CompanyRolePermissionMapper } from '~modules/companies/domain/mappers/company-role-permission';
import { DrizzleCompanyPermissionRepository } from '~modules/companies/infrastructure/persistence/drizzle/repositories/drizzle-company-permission.repository';
import { DrizzleCompanyRolePermissionRepository } from '~modules/companies/infrastructure/persistence/drizzle/repositories/drizzle-company-role-permission.repository';
import { DrizzleCompanyRoleRepository } from '~modules/companies/infrastructure/persistence/drizzle/repositories/drizzle-company-role.repository';

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
    CompanyPermissionMapper,
    CompanyRoleMapper,
    CompanyRolePermissionMapper,
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
  ],
  exports: [
    CompaniesDiToken.RUN_COMPANY_SEEDS_USE_CASE,
    CompaniesDiToken.RUN_COMPANY_PERMISSION_SEEDS_USE_CASE,
    CompaniesDiToken.RUN_COMPANY_ROLE_SEEDS_USE_CASE,
    CompaniesDiToken.RUN_COMPANY_ROLE_PERMISSION_SEEDS_USE_CASE,
  ],
})
export class CompaniesModule {}
