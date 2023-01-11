import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
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

export class CreateCompanyDto {

  @ApiProperty({
    description: 'Companys Full name',
    example: 'Ammar Omari',
    name: 'companyUserFullName',
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
  companyUserFullName!: string;



  @ApiProperty({
    description: 'Companys user phone',
    example: '791234567',
    name: 'companyUserPhone',
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
  companyUserPhone!: string;

  
  @ApiProperty({
    description: 'Companys Full name',
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
    description: "Company's Email when registering",
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
    description: 'Companys Phone',
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
    description: 'Companys location',
    example: 'Amman - Jordan',
    name: 'location',
    required: true,
    type: 'string',
    minLength: 2,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'Location',
    }),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'Location',
    }),
  })
  @MinLength(2, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'Location',
      characters: 2,
    }),
  })
  location!: string;


  @ApiProperty({
    description: 'Companys type',
    example: 'Solutions',
    name: 'companyType',
    required: true,
    type: 'string',
    minLength: 2,
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.isNotEmpty', {
      property: 'companyType',
    }),
  })
  @IsString({
    message: i18nValidationMessage('validation.isString', {
      property: 'companyType',
    }),
  })
  @MinLength(2, {
    message: i18nValidationMessage('validation.minLength', {
      property: 'companyType',
      characters: 2,
    }),
  })
  companyType!: string;


  @ApiProperty({
    description: 'Company password when registering',
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
    description: 'Company wantedPositions',
    examples: ['position 1', 'position 2'],
    name: 'wantedPositions',
    required: false,
    isArray: true,
    type: 'array',
  })
  @IsOptional()
  wantedPositions: string[] = [];
}
