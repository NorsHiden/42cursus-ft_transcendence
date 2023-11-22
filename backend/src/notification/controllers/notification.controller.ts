import {
  Controller,
  Inject,
  Get,
  Query,
  Req,
  Sse,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Routes, Services } from 'src/utils/consts';
import { INotificationService } from '../interfaces/notification.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller(Routes.NOTIFICATION)
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(
    @Inject(Services.Notification)
    private readonly notificationService: INotificationService,
  ) {}

  /**
   * Get notifications for the authenticated user.
   * @param req The request object.
   * @param page The page number for paginated results (optional).
   * @returns An array of notifications for the authenticated user.
   */
  @Get()
  async getNotifications(@Req() req, @Query('page') page: number = 0) {
    return this.notificationService.getNotifications(req.user.sub, page);
  }

  /**
   * Subscribe to Server-Sent Events for notifications.
   * @param req The request object.
   * @param res The response object.
   * @returns The Server-Sent Events stream for notifications.
   */
  @Sse('sse-notifications')
  notifications(@Req() req, @Res() res) {
    return this.notificationService.subscribeToEvent(req.user.sub, res);
  }
}
