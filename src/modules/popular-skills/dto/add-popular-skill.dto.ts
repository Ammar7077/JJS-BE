import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class AddPopularSkillsDto {

  @ApiProperty()
  @IsOptional()
  readonly popularSkills: string[];

  @ApiProperty()
  @IsOptional()
  readonly popularPositions: string[];
}
