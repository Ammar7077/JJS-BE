import { Controller, Get, Query } from '@nestjs/common';
import { JobSeekerService } from './job-seeker.service';
import { FilterJobSeekersDto } from './dto/filter-job-seekers.dto';

@Controller('job-seekers')
export class JobSeekerController {
  constructor(private readonly jobSeekerService: JobSeekerService) {}

  @Get('filter-job-seekers')
  filter(@Query() query: FilterJobSeekersDto) {
    return this.jobSeekerService.filterJobSeekers(query);
  }
}
