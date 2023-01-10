import { ApiProperty } from "@nestjs/swagger";
import { IsBooleanString, IsOptional, IsString } from "class-validator";

export class FilterJobseekersDto {
  @IsOptional()
  @IsString()
  readonly gender?: string

  @IsOptional()
  @IsString()
  readonly minAge?: string

  @IsOptional()
  @IsString()
  readonly maxAge?: string

  @IsOptional()
  readonly skills?: string[]

  @ApiProperty()
  @IsOptional()
  @IsBooleanString()
  // @Transform()
  // 1: experience || 2: no experience
  readonly isExperienced?: string

  @ApiProperty()
  @IsOptional()
  readonly positions?: string[]

  @ApiProperty()
  @IsOptional()
  readonly languages?: string[]

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly location?: string

  @ApiProperty()
  @IsOptional()
  readonly typeOfWork?: string
}