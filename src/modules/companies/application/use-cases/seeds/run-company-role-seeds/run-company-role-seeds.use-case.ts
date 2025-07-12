import { Inject, Injectable, Logger } from '@nestjs/common';

import { CompanyRole } from '~modules/companies/domain/entities/company-role.entity';
import { ICompanyRoleRepository } from '~modules/companies/domain/repositories/company-role-repository.interface';
import { CompaniesDiToken } from '~modules/companies/constants';

import { IBaseSeedInput } from '~shared/infrastructure/seeds/use-cases/base-seed/base-seed-use-case.interface';
import { SeedResult } from '~shared/infrastructure/seeds/use-cases/run-all-seeds/run-all-seeds-use-case.interface';

import { IRunCompanyRoleSeedsUseCase } from './run-company-role-seeds-use-case.interface';

@Injectable()
export class RunCompanyRoleSeedsUseCase implements IRunCompanyRoleSeedsUseCase {
  private readonly logger = new Logger(RunCompanyRoleSeedsUseCase.name);

  constructor(
    @Inject(CompaniesDiToken.COMPANY_ROLE_REPOSITORY)
    private readonly companyRoleRepository: ICompanyRoleRepository,
  ) {}

  async execute(input: IBaseSeedInput = {}): Promise<SeedResult> {
    const { clearExisting = true, dryRun = false } = input;

    this.logger.log('Starting company role seeds execution...');
    this.logger.log(`Clear existing: ${clearExisting}, Dry run: ${dryRun}`);

    try {
      if (clearExisting && !dryRun) {
        this.logger.log('Clearing existing roles...');
        await this.companyRoleRepository.deleteAll();
        this.logger.log('Existing roles cleared successfully');
      }

      let createdCount = 0;

      if (!dryRun) {
        // Create roles
        this.logger.log('Creating roles...');
        const roles = await this.createRoles();
        createdCount = roles.length;

        this.logger.log(`Successfully created ${createdCount} roles`);
      } else {
        createdCount = 2; // admin + member roles
        this.logger.log(`Dry run: Would create ${createdCount} roles`);
      }

      this.logger.log('Company role seeds completed successfully');
      
      return {
        success: true,
        count: createdCount,
      };
    } catch (error) {
      this.logger.error('Failed to run company role seeds', error.stack);
      
      return {
        success: false,
        count: 0,
        error: error.message,
      };
    }
  }

  private async createRoles(): Promise<CompanyRole[]> {
    const roleData = [
      {
        name: 'admin',
        description: 'Full access to company management',
        isDefault: false,
        isSystem: true,
      },
      {
        name: 'member',
        description: 'Basic access for job creation and candidate communication',
        isDefault: true,
        isSystem: true,
      },
    ];

    const roles: CompanyRole[] = [];
    for (const data of roleData) {
      const role = CompanyRole.builder(data.name)
        .description(data.description)
        .isDefault(data.isDefault)
        .isSystem(data.isSystem)
        .build();
      const created = await this.companyRoleRepository.create(role);
      roles.push(created);
    }

    return roles;
  }
} 