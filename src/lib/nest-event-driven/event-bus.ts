import { Injectable, OnModuleDestroy, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { EVENTS_HANDLER_METADATA } from '~lib/nest-event-driven/decorators/constants';
import { DefaultPubSub } from '~lib/nest-event-driven/default-pub-sub';
import { defaultGetEventName } from '~lib/nest-event-driven/helpers/default-get-event-name';
import { IEventBus } from '~lib/nest-event-driven/interfaces/event-bus.interface';
import { IEventHandler } from '~lib/nest-event-driven/interfaces/event-handler.interface';
import { IEventPublisher } from '~lib/nest-event-driven/interfaces/event-publisher.interface';
import { IEvent } from '~lib/nest-event-driven/interfaces/event.interface';
import { HandlerRegister } from '~lib/nest-event-driven/utils/handlers-register';
import { ObservableBus } from '~lib/nest-event-driven/utils/observable-bus';

export type EventHandlerType<TEvent extends IEvent = IEvent> = Type<IEventHandler<TEvent>>;

@Injectable()
export class EventBus<TEvent extends IEvent = IEvent>
  extends ObservableBus<TEvent>
  implements IEventBus<TEvent>, OnModuleDestroy
{
  protected getEventName: (event: TEvent) => string;
  protected readonly subscriptions: Subscription[];
  // Track bound event names to prevent duplicate bindings
  private boundEventNames: Set<string> = new Set<string>();

  protected _pubsub: IEventPublisher;
  private handlersRegister: HandlerRegister<IEventHandler<TEvent>>;

  constructor(moduleRef: ModuleRef) {
    super();
    this.subscriptions = [];
    this.getEventName = defaultGetEventName;
    this.handlersRegister = new HandlerRegister<IEventHandler<TEvent>>(moduleRef, EVENTS_HANDLER_METADATA);
    this.useDefaultPubSub();
  }

  get publisher(): IEventPublisher {
    return this._pubsub;
  }

  set publisher(_publisher: IEventPublisher) {
    this._pubsub = _publisher;
  }

  onModuleDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  publish<T extends TEvent>(event: T) {
    return this._pubsub.publish(event);
  }

  publishAll<T extends TEvent>(events: T[]) {
    if (this._pubsub.publishAll) {
      return this._pubsub.publishAll(events);
    }
    return (events || []).map((event) => this._pubsub.publish(event));
  }

  bind(name: string) {
    // Skip if this event name is already bound
    if (name && this.boundEventNames.has(name)) {
      return;
    }

    // Mark this event name as bound
    if (name) {
      this.boundEventNames.add(name);
    }

    const stream$ = name ? this.ofEventName(name) : this.subject$;
    const subscription = stream$.subscribe(async (event) => {
      const instances = await this.handlersRegister.get(event);
      try {
        await Promise.all(instances.map((instance) => instance.handle(event)));
      } catch (error) {
        console.error(`Error handling event ${name}:`, error);
      }
    });
    this.subscriptions.push(subscription);
  }

  register(handlers: EventHandlerType<TEvent>[] = []) {
    handlers.forEach((handler) => this.registerHandler(handler));
  }

  protected registerHandler(handler: EventHandlerType<TEvent>) {
    if (this.handlersRegister.registerHandler(handler)) {
      const eventsNames = this.reflectEventsNames(handler);
      eventsNames.map((event) => this.bind(event.name));
    }
  }

  protected ofEventName(name: string) {
    return this.subject$.pipe(filter((event) => this.getEventName(event) === name));
  }

  private reflectEventsNames(handler: EventHandlerType<TEvent>): FunctionConstructor[] {
    return Reflect.getMetadata(EVENTS_HANDLER_METADATA, handler);
  }

  private useDefaultPubSub() {
    this._pubsub = new DefaultPubSub();
  }
}
