import { Scope } from '@nestjs/common';

import { type IEvent } from '~lib/nest-event-driven/interfaces/event.interface';

export interface IEventHandlerOptions {
  events: (IEvent | (new (...args: any[]) => IEvent))[];

  scope?: Scope;
}

export interface IEventHandler<TEvent extends IEvent> {
  handle(event: TEvent): void;
}
