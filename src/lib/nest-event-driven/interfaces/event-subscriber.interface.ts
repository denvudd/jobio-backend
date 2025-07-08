import { Subject } from 'rxjs';

import { type IEvent } from '~lib/nest-event-driven/interfaces/event.interface';

export interface IMessageSource<TEvent extends IEvent = IEvent> {
  bridgeEventsTo(subject: Subject<TEvent>): void;
}
