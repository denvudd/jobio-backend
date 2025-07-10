import { Module, forwardRef } from '@nestjs/common';

import { SeedsDiToken } from '~shared/infrastructure/seeds/constants';
import { RunAllSeedsUseCase } from '~shared/infrastructure/seeds/use-cases/run-all-seeds/run-all-seeds.use-case';

import { CategoriesModule } from '~modules/categories/categories.module';

@Module({
  imports: [forwardRef(() => CategoriesModule)],
  providers: [
    { provide: SeedsDiToken.RUN_ALL_SEEDS_USE_CASE, useClass: RunAllSeedsUseCase },
  ],
  exports: [
    SeedsDiToken.RUN_ALL_SEEDS_USE_CASE,
  ],
})
export class SeedsModule {} 