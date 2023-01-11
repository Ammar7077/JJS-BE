import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { JobSeekerModule } from './job-seeker/job-seeker.module';
import { CompanyModule } from './company/company.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [UserModule, AdminModule, JobSeekerModule, CompanyModule, ProfileModule],
  exports: [UserModule, AdminModule, JobSeekerModule, CompanyModule],
})
export class SystemUsersModule {}
