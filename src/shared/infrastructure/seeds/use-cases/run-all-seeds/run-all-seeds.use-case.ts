import { Inject, Injectable, Logger } from '@nestjs/common';

import { RunCategorySeedsUseCase } from '~modules/categories/application/use-cases/seeds/run-category-seeds/run-category-seeds.use-case';
import { RunSubcategorySeedsUseCase } from '~modules/categories/application/use-cases/seeds/run-subcategory-seeds/run-subcategory-seeds.use-case';
import { CategoriesDiToken } from '~modules/categories/constants';
import { RunCompanySeedsUseCase } from '~modules/companies/application/use-cases/seeds/run-company-seeds/run-company-seeds.use-case';
import { CompaniesDiToken } from '~modules/companies/constants';

import { IBaseSeedInput } from '~shared/infrastructure/seeds/use-cases/base-seed/base-seed-use-case.interface';
import {
  IRunAllSeedsUseCase,
  RunAllSeedsOutput,
  SeedResult,
} from '~shared/infrastructure/seeds/use-cases/run-all-seeds/run-all-seeds-use-case.interface';

@Injectable()
export class RunAllSeedsUseCase implements IRunAllSeedsUseCase {
  private readonly logger = new Logger(RunAllSeedsUseCase.name);

  constructor(
    @Inject(CategoriesDiToken.RUN_CATEGORY_SEEDS_USE_CASE)
    private readonly runCategorySeedsUseCase: RunCategorySeedsUseCase,
    @Inject(CategoriesDiToken.RUN_SUBCATEGORY_SEEDS_USE_CASE)
    private readonly runSubcategorySeedsUseCase: RunSubcategorySeedsUseCase,
    @Inject(CompaniesDiToken.RUN_COMPANY_SEEDS_USE_CASE)
    private readonly runCompanySeedsUseCase: RunCompanySeedsUseCase,
  ) {}

  async execute(input: IBaseSeedInput = {}): Promise<RunAllSeedsOutput> {
    const { clearExisting = true, dryRun = false } = input;

    this.logger.log('Starting execution of all seeds...');
    this.logger.log(`Clear existing: ${clearExisting}, Dry run: ${dryRun}`);

    const seeders: Array<{
      name: string;
      useCase: { execute: (input: IBaseSeedInput) => Promise<SeedResult> };
    }> = [
      { name: 'categorySeeds', useCase: this.runCategorySeedsUseCase },
      { name: 'subcategorySeeds', useCase: this.runSubcategorySeedsUseCase },
      { name: 'companySeeds', useCase: this.runCompanySeedsUseCase },
    ];

    const results: RunAllSeedsOutput['results'] = Object.fromEntries(
      seeders.map((seeder) => [seeder.name, { success: false, count: 0 }]),
    ) as RunAllSeedsOutput['results'];

    for (const seeder of seeders) {
      try {
        this.logger.log(`Running ${seeder.name}...`);

        const result = await seeder.useCase.execute({ clearExisting, dryRun });

        results[seeder.name] = {
          success: result.success,
          count: result.count,
          error: result.error,
        };

        this.logger.log(`${seeder.name} completed with success: ${result.success}, count: ${result.count}`);
      } catch (error) {
        this.logger.error(`Failed to run ${seeder.name}: ${error.message}`, error.stack);

        results[seeder.name] = {
          success: false,
          count: 0,
          error: error.message,
        };
      }
    }

    const success = Object.values(results).every((result) => result.success);
    this.logger.log(`All seeds execution completed. Overall success: ${success}`);

    return {
      success,
      results,
    };
  }
}
