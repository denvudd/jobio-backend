import { IBaseSeedInput } from '~shared/infrastructure/seeds/use-cases/base-seed/base-seed-use-case.interface';
import { SeedResult } from '~shared/infrastructure/seeds/use-cases/run-all-seeds/run-all-seeds-use-case.interface';

export interface IRunCompanyPermissionSeedsUseCase {
  execute(input?: IBaseSeedInput): Promise<SeedResult>;
} 