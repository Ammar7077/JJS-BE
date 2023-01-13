import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

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
  readonly years?: number

  @ApiProperty()
  @IsOptional()
  readonly months?: number

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

  @ApiProperty()
  @IsOptional()
  readonly isRemotly?: string

  @ApiProperty()
  @IsOptional()
  readonly isAvailable?: string
}