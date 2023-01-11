import { Module } from '@nestjs/common';
import { JobSeekerService } from './job-seeker.service';
import { JobSeekerController } from './job-seeker.controller';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [JobSeekerController],
  providers: [JobSeekerService],
  imports: [UserModule],
})
export class JobSeekerModule {}
