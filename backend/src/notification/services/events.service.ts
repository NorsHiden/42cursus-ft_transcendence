import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';

@Injectable()
export class EventService {
  private readonly events: EventEmitter;
  constructor() {
    this.events = new EventEmitter();
  }

  subscribe(channel_id: string) {
    return fromEvent(this.events, channel_id);
  }

  emit(channel: string, data?: object) {
    this.events.emit(channel, { data });
  }
}
