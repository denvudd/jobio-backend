import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { EventBus } from '~lib/nest-event-driven/event-bus';
import { ExplorerService } from '~lib/nest-event-driven/services/explorer.service';

@Module({ providers: [ExplorerService, EventBus], exports: [EventBus] })
export class EventDrivenModule implements OnApplicationBootstrap {
  constructor(
    private readonly explorerService: ExplorerService,
    private readonly eventBus: EventBus,
  ) {}

  onApplicationBootstrap() {
    const { events } = this.explorerService.explore();

    this.eventBus.register(events);
  }
}
