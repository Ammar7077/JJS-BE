import { Controller, Post, Body, Param } from '@nestjs/common';
import { Types } from 'mongoose';
import { PushNotificationDto } from './dto/push-notification.dto';
import { PushNotificationService } from './push-notification.service';

@Controller('push-notification')
export class PushNotificationController {
  constructor(
    private readonly pushNotificationService: PushNotificationService,
  ) {}

  @Post('push-notification/:userID')
  pushNotification(
    @Param('userID') id: Types.ObjectId,
    @Body() pushNotificationDto: PushNotificationDto,
  ) {
    return this.pushNotificationService.pushNotification(
      id,
      pushNotificationDto,
    );
  }
}
