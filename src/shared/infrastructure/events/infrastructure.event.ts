import { type IEvent } from '~lib/nest-event-driven/interfaces/event.interface';

import { IntegrationEventType } from '~shared/infrastructure/events/enums/event-type.enum';

export abstract class InfrastructureEvent<TPayload extends object> implements IEvent<TPayload, IntegrationEventType> {
  public abstract readonly eventType: IntegrationEventType;
  constructor(public readonly payload: Readonly<TPayload>) {}
}
