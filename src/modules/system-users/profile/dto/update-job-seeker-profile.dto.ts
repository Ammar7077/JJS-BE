import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Languages } from 'src/shared/interfaces/languages.interface';
import { Experiences } from 'src/shared/interfaces/experiences.interface';
import { Skills } from 'src/shared/interfaces/skills.interface';

export class UpdateJobseekerProfileDto {
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Full Name',
    }),
  })
  @MinLength(2, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Full Name',
      characters: 2,
    }),
  })
  @IsOptional()
  readonly name!: string;

  @IsNumberString({
    message: i18nValidationMessage(
      'validation.userSignUpValidation.phoneNumber',
    ),
  })
  @IsOptional()
  readonly phone!: string;

  @IsString()
  @IsOptional()
  readonly dob!: string;

  @IsIn(['m', 'f'])
  @IsString()
  @Length(1)
  @IsOptional()
  readonly gender!: string;

  @IsString()
  @IsOptional()
  readonly bio: string;

  @IsOptional()
  readonly wantedPositions: string[];

  @IsOptional()
  readonly languages: Languages[];

  @IsOptional()
  readonly experiences: Experiences[];

  @IsOptional()
  readonly typeOfWork: string[];

  @IsString()
  @IsOptional()
  readonly isRemotly: string;

  @IsString()
  @IsOptional()
  readonly isAvailable: string;

  @IsOptional()
  readonly skills: Skills[];

  @ApiProperty({
    description: 'JobSeekers skills',
    examples: ['nodejs', 'nestjs'],
    name: 'skills',
    required: false,
    type: 'string',
  })
  @IsOptional()
  readonly levelOfEducation: string[];

  @ApiProperty({
    description: 'JobSeekers education',
    example: 'PSUT',
    name: 'education',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  readonly education: string;

  @ApiProperty({
    description: 'JobSeekers nationality',
    example: 'Jordanian',
    name: 'nationality',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  readonly nationality: string;
}
