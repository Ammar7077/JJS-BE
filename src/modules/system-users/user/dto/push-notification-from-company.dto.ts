import { IsNotEmpty, IsOptional } from "class-validator";



export class PushNotificationFromCompanyDto {


  // type of notification

  @IsNotEmpty()
  readonly type: string;
  
  @IsNotEmpty()
  readonly senderID: string;
  
  @IsNotEmpty()
  readonly senderName: string;

  @IsNotEmpty()
  readonly title: string;

  @IsOptional()
  readonly body: string = "";

  @IsOptional()
  readonly location: string = "";

  @IsOptional()
  readonly link: string = "";
  
  @IsNotEmpty()
  readonly interviewStart: string;

  @IsOptional()
  readonly interviewEnd: string;
}