import { Body, Controller, 
   Get, Param, Patch } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Roles } from 'src/guards/roles.guard';
import { Role } from 'src/shared/enums/role.enum';
import { PushNotificationDto } from './dto/push-notification.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { UpdateJobseekerProfileDto } from './dto/update-jobseeker-profile.dto';
import { UserService } from './user.service';


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @ApiOkResponse({
    status: 200 || 201,
    description: 'Get one user successfully',
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  
  // @ApiOkResponse({
  //   status: 200 || 201,
  //   description: 'Get one user successfully',
  // })
  @Get(':userID')
  findOne(@Param('userID') id: Types.ObjectId) {
    return this.userService.findOneByID(id);
  }

  // @ApiOkResponse({
  //   status: 200 || 201,
  //   description: 'Get one user successfully',
  // })
  @Patch('update-company-profile/:userID')
  @Roles(Role.Company)
  updateCompanyProfile(@Param('userID') id: Types.ObjectId, @Body() updateCompanyProfileDto: UpdateCompanyProfileDto) {
    return this.userService.updateCompanyProfile(id, updateCompanyProfileDto);
  }


  @Patch('update-jobseeker-profile/:userID')
  @Roles(Role.Jobseeker)
  updateJobseekerProfile(@Param('userID') id: Types.ObjectId, @Body() updateJobseekerProfileDto: UpdateJobseekerProfileDto) {
    return this.userService.updateJobseekerProfile(id, updateJobseekerProfileDto);
  }

  @Patch('push-notification/:userID')
  pushNotification(@Param('userID') id: Types.ObjectId, @Body() pushNotificationDto: PushNotificationDto) {
    return this.userService.pushNotification(id, pushNotificationDto);
  }

}
