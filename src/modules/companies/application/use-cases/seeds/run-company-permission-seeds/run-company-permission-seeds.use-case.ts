import { Inject, Injectable, Logger } from '@nestjs/common';

import { IRunCompanyPermissionSeedsUseCase } from '~modules/companies/application/use-cases/seeds/run-company-permission-seeds/run-company-permission-seeds-use-case.interface';
import { CompaniesDiToken } from '~modules/companies/constants';
import { CompanyPermission } from '~modules/companies/domain/entities/company-permission.entity';
import { CompanyPermissionList } from '~modules/companies/domain/enums/company-management.enum';
import { ICompanyPermissionRepository } from '~modules/companies/domain/repositories/company-permission-repository.interface';

import { IBaseSeedInput } from '~shared/infrastructure/seeds/use-cases/base-seed/base-seed-use-case.interface';
import { SeedResult } from '~shared/infrastructure/seeds/use-cases/run-all-seeds/run-all-seeds-use-case.interface';

@Injectable()
export class RunCompanyPermissionSeedsUseCase implements IRunCompanyPermissionSeedsUseCase {
  private readonly logger = new Logger(RunCompanyPermissionSeedsUseCase.name);

  constructor(
    @Inject(CompaniesDiToken.COMPANY_PERMISSION_REPOSITORY)
    private readonly companyPermissionRepository: ICompanyPermissionRepository,
  ) {}

  async execute(input: IBaseSeedInput = {}): Promise<SeedResult> {
    const { clearExisting = true, dryRun = false } = input;

    this.logger.log('Starting company permission seeds execution...');
    this.logger.log(`Clear existing: ${clearExisting}, Dry run: ${dryRun}`);

    try {
      if (clearExisting && !dryRun) {
        this.logger.log('Clearing existing permissions...');
        await this.companyPermissionRepository.deleteAll();
        this.logger.log('Existing permissions cleared successfully');
      }

      let createdCount = 0;

      if (!dryRun) {
        // Create permissions
        this.logger.log('Creating permissions...');
        const permissions = await this.createPermissions();
        createdCount = permissions.length;

        this.logger.log(`Successfully created ${createdCount} permissions`);
      } else {
        createdCount = 15; // Total number of permissions
        this.logger.log(`Dry run: Would create ${createdCount} permissions`);
      }

      this.logger.log('Company permission seeds completed successfully');

      return {
        success: true,
        count: createdCount,
      };
    } catch (error) {
      this.logger.error('Failed to run company permission seeds', error.stack);

      return {
        success: false,
        count: 0,
        error: error.message,
      };
    }
  }

  private async createPermissions(): Promise<CompanyPermission[]> {
    const permissionData = [
      { name: CompanyPermissionList.CREATE_JOBS, description: 'Can create job postings' },
      { name: CompanyPermissionList.EDIT_JOBS, description: 'Can edit job postings' },
      { name: CompanyPermissionList.DELETE_JOBS, description: 'Can delete job postings' },
      { name: CompanyPermissionList.PUBLISH_JOBS, description: 'Can publish job postings' },
      { name: CompanyPermissionList.VIEW_CANDIDATES, description: 'Can view candidate profiles' },
      { name: CompanyPermissionList.CONTACT_CANDIDATES, description: 'Can contact candidates' },
      { name: CompanyPermissionList.MANAGE_APPLICATIONS, description: 'Can manage job applications' },
      { name: CompanyPermissionList.INVITE_USERS, description: 'Can invite users to company' },
      { name: CompanyPermissionList.REMOVE_USERS, description: 'Can remove users from company' },
      { name: CompanyPermissionList.MANAGE_USER_ROLES, description: 'Can manage user roles in company' },
      { name: CompanyPermissionList.EDIT_COMPANY_INFO, description: 'Can edit company information' },
      { name: CompanyPermissionList.DELETE_COMPANY, description: 'Can delete company' },
      { name: CompanyPermissionList.VIEW_ANALYTICS, description: 'Can view company analytics' },
      { name: CompanyPermissionList.EXPORT_DATA, description: 'Can export company data' },
      { name: CompanyPermissionList.MANAGE_COMPANY_SETTINGS, description: 'Can manage company settings' },
    ];

    const permissions: CompanyPermission[] = [];
    for (const data of permissionData) {
      const permission = CompanyPermission.builder(data.name).description(data.description).build();
      const created = await this.companyPermissionRepository.create(permission);
      permissions.push(created);
    }

    return permissions;
  }
}
