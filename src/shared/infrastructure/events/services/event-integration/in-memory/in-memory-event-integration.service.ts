import { Injectable } from '@nestjs/common';

import { EventEmitterEventSource } from '~shared/infrastructure/events/event-sources/event-emitter/event-emitter.event-source';
import { EventEmitterEventPublisher } from '~shared/infrastructure/events/publishers/event-emitter/event-emitter.event-publisher';
import { EventBusBaseService } from '~shared/infrastructure/events/services/event-integration/base/event-bus-base.service';

import { EventBus } from 'src/lib/nest-event-driven';

@Injectable()
export class InMemoryEventIntegrationService extends EventBusBaseService {
  constructor(eventBus: EventBus, eventPublisher: EventEmitterEventPublisher, eventSource: EventEmitterEventSource) {
    super(eventBus, eventPublisher, eventSource);
  }
}
