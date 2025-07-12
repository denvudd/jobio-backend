import { Inject, Injectable, Logger } from '@nestjs/common';

import { CompaniesDiToken } from '~modules/companies/constants';
import { IRunCompanyPermissionSeedsUseCase } from '../run-company-permission-seeds';
import { IRunCompanyRoleSeedsUseCase } from '../run-company-role-seeds';
import { IRunCompanyRolePermissionSeedsUseCase } from '../run-company-role-permission-seeds';

import { IBaseSeedInput } from '~shared/infrastructure/seeds/use-cases/base-seed/base-seed-use-case.interface';
import { SeedResult } from '~shared/infrastructure/seeds/use-cases/run-all-seeds/run-all-seeds-use-case.interface';

import { IRunCompanySeedsUseCase } from './run-company-seeds-use-case.interface';

@Injectable()
export class RunCompanySeedsUseCase implements IRunCompanySeedsUseCase {
  private readonly logger = new Logger(RunCompanySeedsUseCase.name);

  constructor(
    @Inject(CompaniesDiToken.RUN_COMPANY_PERMISSION_SEEDS_USE_CASE)
    private readonly runCompanyPermissionSeedsUseCase: IRunCompanyPermissionSeedsUseCase,
    @Inject(CompaniesDiToken.RUN_COMPANY_ROLE_SEEDS_USE_CASE)
    private readonly runCompanyRoleSeedsUseCase: IRunCompanyRoleSeedsUseCase,
    @Inject(CompaniesDiToken.RUN_COMPANY_ROLE_PERMISSION_SEEDS_USE_CASE)
    private readonly runCompanyRolePermissionSeedsUseCase: IRunCompanyRolePermissionSeedsUseCase,
  ) {}

  async execute(input: IBaseSeedInput = {}): Promise<SeedResult> {
    const { clearExisting = true, dryRun = false } = input;

    this.logger.log('Starting company seeds execution...');
    this.logger.log(`Clear existing: ${clearExisting}, Dry run: ${dryRun}`);

    try {
      let totalCreatedCount = 0;

      if (!dryRun) {
        // Run permission seeds first
        this.logger.log('Running permission seeds...');
        const permissionResult = await this.runCompanyPermissionSeedsUseCase.execute({ clearExisting, dryRun });
        if (!permissionResult.success) {
          throw new Error(`Permission seeds failed: ${permissionResult.error}`);
        }
        totalCreatedCount += permissionResult.count;

        // Run role seeds
        this.logger.log('Running role seeds...');
        const roleResult = await this.runCompanyRoleSeedsUseCase.execute({ clearExisting: false, dryRun });
        if (!roleResult.success) {
          throw new Error(`Role seeds failed: ${roleResult.error}`);
        }
        totalCreatedCount += roleResult.count;

        // Run role permission seeds
        this.logger.log('Running role permission seeds...');
        const rolePermissionResult = await this.runCompanyRolePermissionSeedsUseCase.execute({ clearExisting: false, dryRun });
        if (!rolePermissionResult.success) {
          throw new Error(`Role permission seeds failed: ${rolePermissionResult.error}`);
        }
        totalCreatedCount += rolePermissionResult.count;

        this.logger.log(`Successfully created ${totalCreatedCount} items total`);
      } else {
        totalCreatedCount = 38; // 15 permissions + 2 roles + 21 role permissions
        this.logger.log(`Dry run: Would create ${totalCreatedCount} items total`);
      }

      this.logger.log('Company seeds completed successfully');
      
      return {
        success: true,
        count: totalCreatedCount,
      };
    } catch (error) {
      this.logger.error('Failed to run company seeds', error.stack);
      
      return {
        success: false,
        count: 0,
        error: error.message,
      };
    }
  }
}
