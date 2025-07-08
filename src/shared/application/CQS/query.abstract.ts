import { Inject } from '@nestjs/common';

import { IDbContext } from '~shared/application/services/db-context-service.interface';
import { IUseCase } from '~shared/application/use-cases/use-case.interface';
import { BaseToken } from '~shared/constants';

export abstract class Query<TInput, TOutput> implements IUseCase<TInput, TOutput> {
  protected _input: TInput;

  @Inject(BaseToken.DB_CONTEXT)
  protected _dbContext: IDbContext;

  async execute(input: TInput): Promise<TOutput> {
    this._input = input;

    const result: TOutput = await this.implementation();

    return result;
  }

  protected abstract implementation(): Promise<TOutput> | TOutput;
}
