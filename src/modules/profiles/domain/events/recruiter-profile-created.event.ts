import { DomainEventType } from '~shared/domain/enums/event-type.enum';

import { DomainEvent } from '~shared/domain/events/domain.event';

export interface IRecruiterProfileCreatedEventPayload {
  userId: string;
  recruiterProfileId: string;
}

export class RecruiterProfileCreatedEvent extends DomainEvent<IRecruiterProfileCreatedEventPayload> {
  public eventType: DomainEventType = DomainEventType.RECRUITER_PROFILE_CREATED;
} 