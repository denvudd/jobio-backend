import { Subject } from 'rxjs';

import { type IEvent } from '~lib/nest-event-driven/interfaces/event.interface';

export interface IEventBus<TEvent extends IEvent = IEvent> {
  subject$: Subject<TEvent>;
  publish<T extends TEvent>(event: T): void;
  publishAll(events: TEvent[]): void;
}
