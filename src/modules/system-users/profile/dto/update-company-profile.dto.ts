import { IsNumberString, IsOptional, IsString } from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class UpdateCompanyProfileDto {

  
  @IsString()
  @IsOptional()
  readonly companyUserFullName!: string;


  @IsNumberString({
    message: i18nValidationMessage(
      'validation.userSignUpValidation.phoneNumber',
    ),
  })
  @IsOptional()
  readonly companyUserPhone!: string;


  @IsString()
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
  readonly location!: string;


  @IsString()
  @IsOptional()
  readonly companyType!: string;


  @IsString()
  @IsOptional()
  readonly wantedPositions: string[];
}
