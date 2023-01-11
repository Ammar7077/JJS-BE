import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SystemUsersModule } from './system-users/system-users.module';
import { PopularSkillsModule } from './popular-skills/popular-skills.module';
import { PopularPositionsModule } from './popular-positions/popular-positions.module';
import { PushNotificationModule } from './push-notification/push-notification.module';

@Module({
  imports: [
    AuthModule,
    SystemUsersModule,
    PopularSkillsModule,
    PopularPositionsModule,
    PushNotificationModule,
  ],
  exports: [
    AuthModule,
    SystemUsersModule,
    PopularSkillsModule,
    PopularPositionsModule,
    PushNotificationModule,
  ],
})
export class ModulesModule {}
