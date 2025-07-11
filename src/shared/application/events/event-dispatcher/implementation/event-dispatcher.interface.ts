import { Injectable, Scope } from '@nestjs/common';

import { IEventDispatcher } from '~shared/application/events/event-dispatcher/event-dispatcher.interface';
import { IEventIntegrationService } from '~shared/application/services/event-integration-service.interface';

import { IEvent } from 'src/lib/nest-event-driven';

@Injectable({ scope: Scope.REQUEST })
export class EventDispatcher implements IEventDispatcher {
  private events: IEvent[] = [];

  constructor(private readonly integrationService: IEventIntegrationService) {}

  registerEvent(event: IEvent): void {
    this.events.push(event);
  }

  dispatchEvents(): void {
    if (!this.events.length) return;

    this.integrationService.publishEvents(this.events);
    this.events = [];
  }
}
