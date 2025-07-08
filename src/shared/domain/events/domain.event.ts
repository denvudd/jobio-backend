import { DomainEventType } from '~shared/domain/enums/event-type.enum';

import { IEvent } from 'src/lib/nest-event-driven';

export abstract class DomainEvent<TPayload extends object> implements IEvent<TPayload, DomainEventType> {
  public abstract readonly eventType: DomainEventType;
  constructor(public readonly payload: Readonly<TPayload>) {}
}
