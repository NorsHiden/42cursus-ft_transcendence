import { Module } from '@nestjs/common';
import { EventService } from './services/events.service';

@Module({
  imports: [],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
