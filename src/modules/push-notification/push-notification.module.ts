import { Module } from '@nestjs/common';
import { PushNotificationService } from './push-notification.service';
import { PushNotificationController } from './push-notification.controller';
import { UserModule } from '../system-users/user/user.module';

@Module({
  controllers: [PushNotificationController],
  providers: [PushNotificationService],
  imports: [UserModule],
})
export class PushNotificationModule {}
