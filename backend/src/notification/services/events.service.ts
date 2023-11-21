import { Injectable, Res } from '@nestjs/common';
import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';

@Injectable()
export class EventService {
  // Private instance of EventEmitter for handling events.
  private readonly events: EventEmitter;

  // Constructor to initialize the EventEmitter when the service is instantiated.
  constructor() {
    this.events = new EventEmitter();
  }

  /**
   * Get the events property.
   * @returns The events property, which likely contains information or functionality related to events.
   */
  getEvent() {
    return this.events;
  }

  /**
   * Subscribe to events on a specific channel.
   * @param channel_id The ID of the channel to subscribe to.
   * @returns An Observable that emits events on the specified channel.
   */
  subscribe(channel_id: string, @Res() res) {
    // Use the 'fromEvent' function to create an Observable from EventEmitter events.
    return fromEvent(this.events, channel_id);
  }

  /**
   * Emit an event on a specific channel with optional data.
   * @param channel The channel on which to emit the event.
   * @param data Optional data to include in the emitted event.
   */
  emit(channel: string, data?: object) {
    // Emit an event on the specified channel with optional data wrapped in an object.
    this.events.emit(channel, { data });
  }
}
