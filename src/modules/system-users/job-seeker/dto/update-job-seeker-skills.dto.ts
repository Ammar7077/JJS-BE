import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateJobseekerSkillsDto {  
  @IsNotEmpty()
  readonly skillName: string;

  @IsNotEmpty()
  readonly skillValue: number;

  @IsOptional()
  readonly isDeleted?: boolean = false;
}
