import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { PasswordContainsLowercaseLetter } from 'src/shared/decorators/validation/password/lowercase-letters.decorator';
import { PasswordContainsNumbers } from 'src/shared/decorators/validation/password/numbers.decorator';
import { PasswordContainsSpecialCharacter } from 'src/shared/decorators/validation/password/special-characters.decorator';
import { PasswordContainsUppercaseLetter } from 'src/shared/decorators/validation/password/uppercase-letters.decorator';
import { Unique } from 'src/shared/decorators/validation/unique-property.decorator';
import { Experiences } from 'src/shared/interfaces/experiences.interface';
import { Languages } from 'src/shared/interfaces/languages.interface';
import { Skills } from 'src/shared/interfaces/skills.interface';

export class CreateJobSeekerDto {
  @ApiProperty({
    description: "Jobseeker's Email when registering",
    example: 'ammaromari@gmail.com',
    name: 'email',
    required: true,
    uniqueItems: true,
    type: 'string',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Email',
    }),
  })
  @IsEmail(undefined, {
    message: i18nValidationMessage('validation.email'),
  })
  @MinLength(5, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Email',
      characters: 5,
    }),
  })
  @Unique('email')
  email!: string;

  @ApiProperty({
    description: 'Jobseeker password when registering',
    example: 'GreaT_PassWord_123',
    name: 'password',
    required: true,
    minLength: 8,
    maxLength: 20,
    pattern: `/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$@^%&?.-_-*/ "])[a-zA-Z0-9!#$@^%&?.-_-*/]{8,20}$/`,
    type: 'string',
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Password',
    }),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Password',
    }),
  })
  @MinLength(8, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Password',
      characters: 8,
    }),
  })
  @MaxLength(20, {
    message: i18nValidationMessage('validation.maxLength', {
      property: 'Password',
      characters: 21,
    }),
  })
  @PasswordContainsNumbers()
  @PasswordContainsSpecialCharacter()
  @PasswordContainsLowercaseLetter()
  @PasswordContainsUppercaseLetter()
  password!: string;

  @ApiProperty({
    description: 'JobSeekers Full name',
    example: 'Ammar Omari',
    name: 'fullName',
    required: true,
    type: 'string',
    minLength: 2,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Full Name',
    }),
  })
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
  name!: string;

  @ApiProperty({
    description: 'JobSeekers Phone',
    example: '791234567',
    name: 'phone number',
    required: true,
    type: 'number',
    minLength: 2,
  })
  @IsNotEmpty({
    message: i18nValidationMessage(
      'validation.userSignUpValidation.notEmpty.phoneNumber',
    ),
  })
  @Length(4, 15, {
    message: i18nValidationMessage(
      'validation.userSignUpValidation.length.phoneNumber',
    ),
  })
  @IsNumberString({
    message: i18nValidationMessage(
      'validation.userSignUpValidation.phoneNumber',
    ),
  })
  phone!: string;

  @ApiProperty({
    description: 'Jobseeker birthday',
    type: 'date string',
    required: true,
    example: '2000-07-12',
    name: 'birthday',
    minimum: 18,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Birth Day',
    }),
  })
  dob!: string;

  @ApiProperty({
    description: 'JobSeekers gender',
    example: 'f OR m',
    name: 'gender',
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 1,
  })
  @IsIn(['m', 'f'])
  @IsNotEmpty()
  @IsString()
  @Length(1)
  gender!: string;

  @ApiProperty({
    description: 'JobSeekers bio',
    example: 'bio bio bio ...',
    name: 'bio',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  bio: string = '';

  @ApiProperty({
    description: 'JobSeekers notifications',
    examples: [
      {
        any: 'any',
        any1: 'any1',
        moreAny: 'moreAny',
      },
      {
        skillName: 'string',
        any1: 'any1',
        moreAny: 'moreAny',
      },
    ],
    name: 'notifications',
    required: false,
    isArray: true,
    type: 'array',
  })
  @IsOptional()
  notifications: any[] = [];

  @ApiProperty({
    description: 'JobSeekers wantedPositions',
    examples: ['position 1', 'position 2'],
    name: 'wantedPositions',
    required: false,
    isArray: true,
    type: 'array',
  })
  @IsOptional()
  wantedPositions: string[] = [];

  @ApiProperty({
    description: 'JobSeekers languages',
    examples: [
      {
        languageName: 'string',
        languageValue: 'number',
      },
      {
        languageName: 'string',
        languageValue: 'number',
      },
    ],
    name: 'languages',
    required: false,
    isArray: true,
    type: 'array',
  })
  @IsOptional()
  languages: Languages[] = [];

  @ApiProperty({
    description: 'JobSeekers experiences',
    examples: [
      {
        months: 'number',
        years: 'number',
        name: 'string',
        companyName: 'string',
        description: 'string',
        startTime: 'Date',
        endTime: 'Date',
      },
      {
        months: 'number',
        years: 'number',
        name: 'string',
        companyName: 'string',
        description: 'string',
        startTime: 'Date',
        endTime: 'Date',
      },
    ],
    name: 'experiences',
    required: false,
    isArray: true,
    type: 'array',
  })
  @IsOptional()
  experiences: Experiences[] = [];

  @ApiProperty({
    description: 'JobSeekers typeOfWork',
    examples: ['full time', 'part time', 'internship/training', 'freelancer'],
    name: 'typeOfWork',
    required: false,
    type: 'string',
  })
  @IsOptional()
  typeOfWork: string[] = [];

  @ApiProperty({
    description: 'JobSeekers is remotely',
    example: 'y OR n',
    name: 'isRemotely',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  readonly isRemotely: string = '';

  @ApiProperty({
    description: 'JobSeekers is Available',
    example: 'y OR n',
    name: 'isAvailable',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  readonly isAvailable: string = '';

  @ApiProperty({
    description: 'JobSeekers skills',
    examples: [
      {
        skillName: 'string',
        skillValue: 'number',
        skillDate: 'Date',
        isDeleted: 'boolean',
      },
      {
        skillName: 'string',
        skillValue: 'number',
        skillDate: 'Date',
        isDeleted: 'boolean',
      },
    ],
    name: 'skills',
    required: false,
    isArray: true,
    type: 'string',
  })
  @IsOptional()
  readonly skills: Skills[] = [];

  @ApiProperty({
    description: 'JobSeekers skills',
    examples: ['nodejs', 'nestjs'],
    name: 'skills',
    required: false,
    type: 'string',
  })
  @IsOptional()
  readonly levelOfEducation: string[] = [];

  @ApiProperty({
    description: 'JobSeekers education',
    example: 'PSUT',
    name: 'education',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  readonly education: string = '';

  @ApiProperty({
    description: 'JobSeekers nationality',
    example: 'Jordanian',
    name: 'nationality',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  readonly nationality: string = '';
}
