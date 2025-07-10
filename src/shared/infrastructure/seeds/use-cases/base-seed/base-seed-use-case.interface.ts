import { IUseCase } from '~shared/application/use-cases/use-case.interface';

export interface IBaseSeedInput {
  /** Whether to clear existing data before seeding */
  clearExisting?: boolean;
  /** Whether to simulate the operation without actually executing it */
  dryRun?: boolean;
}

export interface IBaseSeedOutput {
  success: boolean;
  count: number;
  error?: string;
}

export interface IBaseSeedUseCase<TInput extends IBaseSeedInput, TOutput extends IBaseSeedOutput>
  extends IUseCase<TInput, TOutput> {}
