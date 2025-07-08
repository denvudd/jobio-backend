import { DomainEventType } from '~shared/domain/enums/event-type.enum';

import { UserEvent } from '~modules/auth/domain/events/user.event';

export class UserCreatedEvent extends UserEvent {
  public eventType: DomainEventType = DomainEventType.USER_CREATED;
}
