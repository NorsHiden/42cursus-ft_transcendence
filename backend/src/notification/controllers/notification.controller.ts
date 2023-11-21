import {
  Controller,
  Inject,
  Get,
  Query,
  Req,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/consts';
import { INotificationService } from '../interfaces/notification.interface';
import { EventService } from '../services/events.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller(Routes.NOTIFICATION)
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(
    @Inject(Services.Notification)
    private readonly notificationService: INotificationService,
    private readonly eventService: EventService,
  ) {}

  @Get()
  async getNotifications(@Req() req, @Query('page') page: number) {
    return this.notificationService.getNotifications(req.user.sub, page);
  }

  @Sse('sse-notifications')
  notifications(@Req() req) {
    return this.eventService.subscribe(req.user.sub);
  }

  // @Get('emit')
  // emitTest(@Req() req) {
  //   return this.eventService.emit(req.user.sub, {
  //     data: 'hello',
  //   });
  // }
}
