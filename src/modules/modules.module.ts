import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SystemUsersModule } from './system-users/system-users.module';
import { PopularSkillsModule } from './popular-skills/popular-skills.module';
import { PopularPositionsModule } from './popular-positions/popular-positions.module';

@Module({
  imports: [AuthModule, SystemUsersModule, PopularSkillsModule, PopularPositionsModule],
  exports: [AuthModule, SystemUsersModule],
})
export class ModulesModule {}
