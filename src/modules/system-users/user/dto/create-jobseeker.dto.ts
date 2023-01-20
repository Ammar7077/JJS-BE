import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
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
import { favorites } from 'src/shared/interfaces/favorite.interface';
import { Languages } from 'src/shared/interfaces/languages.interface';
import { Skills } from 'src/shared/interfaces/skills.interface';

export class CreateJobseekerDto {
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
    description: 'Jobseekers Full name',
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
    description: 'Jobseekers Phone',
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
    description: 'Jobseekers gender',
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
    description: 'Jobseekers bio',
    example: 'bio bio bio ...',
    name: 'bio',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  bio: string = '';

  @ApiProperty({
    description: 'Jobseekers notifications',
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
    description: 'Jobseekers wantedPositions',
    examples: ['position 1', 'position 2'],
    name: 'wantedPositions',
    required: false,
    isArray: true,
    type: 'array',
  })
  @IsOptional()
  wantedPositions: string[] = [];

  @ApiProperty({
    description: 'Jobseekers languages',
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
    description: 'Jobseekers experiences',
    examples: [
      {
        months: 'number',
        years: 'number',
        name: 'string',
        companyName: 'string',
        descreption: 'string',
        startTime: 'Date',
        endTime: 'Date',
      },
      {
        months: 'number',
        years: 'number',
        name: 'string',
        companyName: 'string',
        descreption: 'string',
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
    description: 'Jobseekers typeOfWork',
    examples: ['full time', 'part time', 'internship/traning', 'freelancer'],
    name: 'typeOfWork',
    required: false,
    type: 'string',
  })
  @IsOptional()
  typeOfWork: string[] = [];

  @ApiProperty({
    description: 'Jobseekers is remotly',
    example: 'y OR n',
    name: 'isRemotly',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  readonly isRemotly: string = '';

  @ApiProperty({
    description: 'Jobseekers is Available',
    example: 'y OR n',
    name: 'isAvailable',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  readonly isAvailable: string = '';

  @ApiProperty({
    description: 'Jobseekers skills',
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
    description: 'Jobseekers levelOfEducation',
    examples: ['nodejs', 'nestjs'],
    name: 'levelOfEducation',
    required: false,
    type: 'levelOfEducation',
  })
  @IsOptional()
  readonly levelOfEducation: string[] = [];

  @ApiProperty({
    description: 'Jobseekers education',
    example: 'PSUT',
    name: 'education',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  readonly education: string = '';

  @ApiProperty({
    description: 'Jobseekers nationality',
    example: 'Jordanian',
    name: 'nationality',
    required: false,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  readonly nationality: string = '';

  @ApiProperty({
    description: 'Jobseekers favorites',
    examples: [
      {
        id: '8415851845815',
        name: 'Ammar Omari',
        email: 'ammarEmail@gmail.com',
      },
      {
        id: '8415851845815',
        name: 'Ammar Omari',
        email: 'ammarEmail@gmail.com',
      },
    ],
    name: 'favorites',
    required: false,
    type: 'Array',
  })
  @IsOptional()
  readonly favorites: favorites[] = [];

  @ApiProperty({
    description: 'Jobseekers is Hidden',
    example: 'true and false',
    name: 'isHidden',
    required: false,
    type: 'boolean',
  })
  @IsBoolean()
  @IsOptional()
  readonly isHidden: boolean = false;
}
