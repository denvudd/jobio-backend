import { Inject, Injectable, Logger } from '@nestjs/common';

import { IRunCompanyRolePermissionSeedsUseCase } from '~modules/companies/application/use-cases/seeds/run-company-role-permission-seeds/run-company-role-permission-seeds-use-case.interface';
import { CompaniesDiToken } from '~modules/companies/constants';
import { CompanyPermission } from '~modules/companies/domain/entities/company-permission.entity';
import { CompanyRole } from '~modules/companies/domain/entities/company-role.entity';
import { CompanyPermissionList } from '~modules/companies/domain/enums/company-management.enum';
import { ICompanyPermissionRepository } from '~modules/companies/domain/repositories/company-permission-repository.interface';
import { ICompanyRolePermissionRepository } from '~modules/companies/domain/repositories/company-role-permission-repository.interface';
import { ICompanyRoleRepository } from '~modules/companies/domain/repositories/company-role-repository.interface';

import { IBaseSeedInput } from '~shared/infrastructure/seeds/use-cases/base-seed/base-seed-use-case.interface';
import { SeedResult } from '~shared/infrastructure/seeds/use-cases/run-all-seeds/run-all-seeds-use-case.interface';

@Injectable()
export class RunCompanyRolePermissionSeedsUseCase implements IRunCompanyRolePermissionSeedsUseCase {
  private readonly logger = new Logger(RunCompanyRolePermissionSeedsUseCase.name);

  constructor(
    @Inject(CompaniesDiToken.COMPANY_PERMISSION_REPOSITORY)
    private readonly companyPermissionRepository: ICompanyPermissionRepository,
    @Inject(CompaniesDiToken.COMPANY_ROLE_REPOSITORY)
    private readonly companyRoleRepository: ICompanyRoleRepository,
    @Inject(CompaniesDiToken.COMPANY_ROLE_PERMISSION_REPOSITORY)
    private readonly companyRolePermissionRepository: ICompanyRolePermissionRepository,
  ) {}

  async execute(input: IBaseSeedInput = {}): Promise<SeedResult> {
    const { clearExisting = true, dryRun = false } = input;

    this.logger.log('Starting company role permission seeds execution...');
    this.logger.log(`Clear existing: ${clearExisting}, Dry run: ${dryRun}`);

    try {
      if (clearExisting && !dryRun) {
        this.logger.log('Clearing existing role permissions...');
        await this.companyRolePermissionRepository.deleteAll();
        this.logger.log('Existing role permissions cleared successfully');
      }

      let createdCount = 0;

      if (!dryRun) {
        // Get existing permissions and roles
        this.logger.log('Fetching existing permissions and roles...');
        const permissions = await this.companyPermissionRepository.findAll();
        const roles = await this.companyRoleRepository.findAll();

        if (permissions.length === 0) {
          throw new Error('No permissions found. Please run permission seeds first.');
        }

        if (roles.length === 0) {
          throw new Error('No roles found. Please run role seeds first.');
        }

        // Assign permissions to roles
        this.logger.log('Assigning permissions to roles...');
        const assignedCount = await this.assignPermissionsToRoles(permissions, roles);
        createdCount = assignedCount;

        this.logger.log(`Successfully assigned ${createdCount} role permissions`);
      } else {
        createdCount = 21; // 15 permissions for admin + 6 for member
        this.logger.log(`Dry run: Would assign ${createdCount} role permissions`);
      }

      this.logger.log('Company role permission seeds completed successfully');

      return {
        success: true,
        count: createdCount,
      };
    } catch (error) {
      this.logger.error('Failed to run company role permission seeds', error.stack);

      return {
        success: false,
        count: 0,
        error: error.message,
      };
    }
  }

  private async assignPermissionsToRoles(permissions: CompanyPermission[], roles: CompanyRole[]): Promise<number> {
    const adminRole = roles.find((r) => r.name === 'admin');
    const memberRole = roles.find((r) => r.name === 'member');

    if (!adminRole || !memberRole) {
      throw new Error('Required roles (admin, member) not found');
    }

    let assignedCount = 0;

    // Admin gets all permissions
    for (const permission of permissions) {
      await this.companyRolePermissionRepository.assignPermissionToRole(adminRole.id, permission.id);
      assignedCount++;
    }

    // Member gets basic permissions
    const memberPermissions = [
      CompanyPermissionList.CREATE_JOBS,
      CompanyPermissionList.EDIT_JOBS,
      CompanyPermissionList.PUBLISH_JOBS,
      CompanyPermissionList.VIEW_CANDIDATES,
      CompanyPermissionList.CONTACT_CANDIDATES,
      CompanyPermissionList.MANAGE_APPLICATIONS,
    ];

    for (const permissionName of memberPermissions) {
      const permission = permissions.find((p) => p.name === permissionName);
      if (permission) {
        await this.companyRolePermissionRepository.assignPermissionToRole(memberRole.id, permission.id);
        assignedCount++;
      }
    }

    return assignedCount;
  }
}
