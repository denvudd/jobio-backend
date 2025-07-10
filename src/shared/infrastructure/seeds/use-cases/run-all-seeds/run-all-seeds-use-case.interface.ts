import { IUseCase } from '~shared/application/use-cases/use-case.interface';
import { IBaseSeedInput } from '~shared/infrastructure/seeds/use-cases/base-seed/base-seed-use-case.interface';

export interface SeedResult {
  success: boolean;
  count: number;
  error?: string;
}

export interface RunAllSeedsOutput {
  success: boolean;
  results: Record<string, SeedResult>;
}

export interface IRunAllSeedsUseCase extends IUseCase<IBaseSeedInput, RunAllSeedsOutput> {}
