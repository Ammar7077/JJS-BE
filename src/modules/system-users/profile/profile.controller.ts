import { Controller, Body, Patch, Param } from '@nestjs/common';
import { Types } from 'mongoose';
import { Roles } from 'src/guards/roles.guard';
import { Role } from 'src/shared/enums/role.enum';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { UpdateJobseekerProfileDto } from './dto/update-job-seeker-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch('company-profile/:companyID')
  @Roles(Role.Company)
  updateCompanyProfile(
    @Param('companyID') id: Types.ObjectId,
    @Body() updateCompanyProfileDto: UpdateCompanyProfileDto,
  ) {
    return this.profileService.updateCompanyProfile(
      id,
      updateCompanyProfileDto,
    );
  }

  @Patch('job-seeker-profile/:userID')
  @Roles(Role.Jobseeker)
  updateJobseekerProfile(
    @Param('userID') id: Types.ObjectId,
    @Body() updateJobseekerProfileDto: UpdateJobseekerProfileDto,
  ) {
    return this.profileService.updateJobseekerProfile(
      id,
      updateJobseekerProfileDto,
    );
  }
}
