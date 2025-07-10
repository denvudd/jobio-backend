import { Logger } from '@nestjs/common';

import {
  IBaseSeedInput,
  IBaseSeedOutput,
  IBaseSeedUseCase,
} from '~shared/infrastructure/seeds/use-cases/base-seed/base-seed-use-case.interface';

export abstract class BaseSeedUseCase<
  TInput extends IBaseSeedInput = IBaseSeedInput,
  TOutput extends IBaseSeedOutput = IBaseSeedOutput,
> implements IBaseSeedUseCase<TInput, TOutput>
{
  protected readonly logger: Logger;

  constructor(loggerContext: string) {
    this.logger = new Logger(loggerContext);
  }

  async execute(input: TInput = {} as TInput): Promise<TOutput> {
    const { clearExisting = true, dryRun = false } = input;
    this.logger.log(`Starting seed. Clear existing: ${clearExisting}, Dry run: ${dryRun}`);
    try {
      if (clearExisting && !dryRun) {
        this.logger.log('Clearing existing data...');
        await this.clearAll();
        this.logger.log('Existing data cleared successfully');
      }
      const seeds = this.getSeeds();
      let createdCount = 0;
      if (!dryRun) {
        this.logger.log(`Creating ${seeds.length} items...`);
        for (const seed of seeds) {
          const created = await this.createSeed(seed);
          if (created) createdCount++;
        }
        this.logger.log(`Successfully created ${createdCount} items`);
      } else {
        createdCount = seeds.length;
        this.logger.log(`Dry run: Would create ${createdCount} items`);
      }
      return {
        success: true,
        count: createdCount,
      } as TOutput;
    } catch (error) {
      this.logger.error(`Failed to execute seed: ${error.message}`, error.stack);
      return {
        success: false,
        count: 0,
        error: error.message,
      } as TOutput;
    }
  }

  /** Очищення всіх даних */
  protected abstract clearAll(): Promise<void>;
  /** Повертає масив сид-даних */
  protected abstract getSeeds(): any[];
  /** Створює одну сутність */
  protected abstract createSeed(seed: any): Promise<boolean>;
}
