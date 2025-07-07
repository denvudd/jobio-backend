import { DomainEventType } from '~shared/domain/enums/event-type.enum';
import { UserRole } from '~shared/domain/enums/user-role.enum';
import { DomainEvent } from '~shared/domain/events/domain.event';

import { User } from '../entities/user.entity';

export interface IUserEventPayload {
  user: User;
  role?: UserRole;
}

export class UserEvent<TPayload extends IUserEventPayload = IUserEventPayload> extends DomainEvent<TPayload> {
  public eventType: DomainEventType = DomainEventType.USER;
}
