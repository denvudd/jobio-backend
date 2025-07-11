import { Inject } from '@nestjs/common';

import { IEventDispatcher } from '~shared/application/events/event-dispatcher/event-dispatcher.interface';
import { IDbContext } from '~shared/application/services/db-context-service.interface';
import { IUseCase } from '~shared/application/use-cases/use-case.interface';
import { BaseToken } from '~shared/constants';

export abstract class Command<TInput = void, TOutput = void> implements IUseCase<TInput, TOutput> {
  protected _input: TInput;

  @Inject(BaseToken.DB_CONTEXT)
  protected _dbContext: IDbContext;

  @Inject(BaseToken.EVENT_DISPATCHER)
  protected _eventDispatcher: IEventDispatcher;

  async execute(input: TInput): Promise<TOutput> {
    this._input = input;

    await this._dbContext.startTransaction();

    let result: TOutput;

    try {
      result = await this.implementation();

      await this._dbContext.commitTransaction();
      this._eventDispatcher.dispatchEvents();
    } catch (error) {
      await this._dbContext.rollbackTransaction();

      throw error;
    }

    return result;
  }

  protected abstract implementation(): Promise<TOutput> | TOutput;
}
