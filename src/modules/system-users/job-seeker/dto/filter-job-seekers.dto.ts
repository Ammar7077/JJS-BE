import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterJobSeekersDto {
  @IsOptional()
  @IsString()
  readonly gender?: string;

  @IsOptional()
  @IsString()
  readonly minAge?: string;

  @IsOptional()
  @IsString()
  readonly maxAge?: string;

  @IsOptional()
  readonly skills?: string[];

  @ApiProperty()
  @IsOptional()
  readonly years?: number;

  @ApiProperty()
  @IsOptional()
  readonly months?: number;

  @ApiProperty()
  @IsOptional()
  readonly positions?: string[];

  @ApiProperty()
  @IsOptional()
  readonly languages?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly location?: string;

  @ApiProperty()
  @IsOptional()
  readonly typeOfWork?: string;
}
