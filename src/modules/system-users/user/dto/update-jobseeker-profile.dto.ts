import { PartialType } from '@nestjs/mapped-types';
import { CreateJobseekerDto } from './create-jobseeker.dto';

export class UpdateJobseekerProfileDto extends PartialType(CreateJobseekerDto) {}
