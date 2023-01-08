import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";



export class PushNotificationDto {

  @ApiProperty({
    description: 'feedback / interview / report',
    example: 'feedback OR interview OR report',
    name: 'notificationType',
    required: false,
    type: 'string',
  })
  @IsOptional()
  readonly type: string = "";

  @ApiProperty({
    description: 'Company object ID',
    example: 'objectID',
    name: 'notificationType',
    required: false,
    type: 'string',
  })
  @IsOptional()
  readonly senderID: string = "";
  
  @ApiProperty({
    description: 'Company Name',
    example: 'companyName',
    name: 'name',
    required: false,
    type: 'string',
  })
  @IsOptional()
  readonly senderName: string = "";


  @ApiProperty({
    description: 'Title Name',
    example: 'Message title',
    name: 'title',
    required: false,
    type: 'string',
  })
  @IsOptional()
  readonly title: string = "";


  @ApiProperty({
    description: 'Description',
    example: 'Description of the notification',
    name: 'description',
    required: false,
    type: 'string',
  })
  @IsOptional()
  readonly body: string = "";


  @ApiProperty({
    description: 'Location of interview',
    example: 'Amman - Khalda - 79 B',
    name: 'location',
    required: false,
    type: 'string',
  })
  @IsOptional()
  readonly location: string = "";

  @ApiProperty({
    description: 'link of interview',
    example: 'http://example.com/zoom/994499',
    name: 'link',
    required: false,
    type: 'string',
  })
  @IsOptional()
  readonly link: string = "";
  
  @ApiProperty({
    description: 'Interview starting time',
    example: '2023-01-23 13:00:00',
    name: 'interviewStartTime',
    required: false,
    type: 'string',
  })
  @IsOptional()
  readonly interviewStart: string = "";

  @ApiProperty({
    description: 'Interview starting time',
    example: '2023-01-23 13:00:00',
    name: 'interviewEndTime',
    required: false,
    type: 'string',
  })
  @IsOptional()
  readonly interviewEnd: string = "";


  @ApiProperty({
    description: 'Position',
    example: 'full-stack',
    name: 'position',
    required: false,
    type: 'String',
  })
  @IsOptional()
  readonly position: string = "";

  @ApiProperty({
    description: 'Is Jobseeker Accepted',
    example: 'y OR n',
    name: 'isAccepted',
    required: false,
    type: 'String',
  })
  @IsOptional()
  readonly isAccepted: string = "";
}