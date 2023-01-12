import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SystemUsersModule } from './system-users/system-users.module';
import { PushNotificationModule } from './push-notification/push-notification.module';

@Module({
  imports: [AuthModule, SystemUsersModule, PushNotificationModule],
  exports: [AuthModule, SystemUsersModule, PushNotificationModule],
})
export class ModulesModule {}
