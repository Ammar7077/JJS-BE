import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [UserModule],
})
export class ProfileModule {}
