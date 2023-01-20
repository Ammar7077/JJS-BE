import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class favoritesDto {
  @IsString()
  @IsOptional()
  readonly id!: string;

  @IsString()
  @IsOptional()
  readonly name!: string;

  @IsString()
  @IsOptional()
  readonly email!: string;

  @IsNumberString({
    message: i18nValidationMessage(
      'validation.userSignUpValidation.phoneNumber',
    ),
  })
  @IsOptional()
  readonly phone!: string;
}
