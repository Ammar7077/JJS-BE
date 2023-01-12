import { IsNotEmpty } from 'class-validator';

export class UpdateJobseekerSkillsDto {
  @IsNotEmpty()
  readonly skillName: string;

  @IsNotEmpty()
  readonly skillValue: number;
}
