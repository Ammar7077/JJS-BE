import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { JobSeekerService } from './job-seeker.service';
import { FilterJobSeekersDto } from './dto/filter-job-seekers.dto';
import { Types } from 'mongoose';
import { UpdateJobseekerSkillsDto } from './dto/update-job-seeker-skills.dto';

@Controller('job-seekers')
export class JobSeekerController {
  constructor(private readonly jobSeekerService: JobSeekerService) {}

  @Get('filter-job-seekers')
  filter(@Query() query: FilterJobSeekersDto) {
    return this.jobSeekerService.filterJobSeekers(query);
  }

  @Patch('update-skills/:job-seekerID')
  addAndUpdateNewSkill(
    @Param('job-seekerID') id: Types.ObjectId,
    @Body() updateJobseekerSkillsDto: UpdateJobseekerSkillsDto,
  ) {
    return this.jobSeekerService.updateAndAddNewSkill(
      id,
      updateJobseekerSkillsDto,
    );
  }
}
