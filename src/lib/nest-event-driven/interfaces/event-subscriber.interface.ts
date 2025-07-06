import { Subject } from 'rxjs';

import { IEvent } from './event.interface';

export interface IMessageSource<TEvent extends IEvent = IEvent> {
  bridgeEventsTo(subject: Subject<TEvent>): void;
}
