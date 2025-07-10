import { IUseCase } from '~shared/application/use-cases/use-case.interface';

export interface IBaseSeedInput {
  clearExisting?: boolean;
  dryRun?: boolean;
}

export interface IBaseSeedOutput {
  success: boolean;
  count: number;
  error?: string;
}

export interface IBaseSeedUseCase<TInput extends IBaseSeedInput, TOutput extends IBaseSeedOutput>
  extends IUseCase<TInput, TOutput> {}
