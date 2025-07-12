import { SeedResult } from '~shared/infrastructure/seeds/use-cases/run-all-seeds/run-all-seeds-use-case.interface';

import { IBaseSeedInput } from '~shared/infrastructure/seeds/use-cases/base-seed/base-seed-use-case.interface';

export interface IRunCompanySeedsUseCase {
  execute(input?: IBaseSeedInput): Promise<SeedResult>;
} 