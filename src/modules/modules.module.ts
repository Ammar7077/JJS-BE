import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SystemUsersModule } from './system-users/system-users.module';

@Module({
  imports: [AuthModule, SystemUsersModule],
  exports: [AuthModule, SystemUsersModule],
})
export class ModulesModule {}
