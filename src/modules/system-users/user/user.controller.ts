import { Body, Controller, 
  // Post, Body, Request, UseGuards,
   Get, Param, Patch,
    // Post
   } from '@nestjs/common';
import {
  // ApiBadRequestResponse,
  // ApiCreatedResponse,
  // ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Roles } from 'src/guards/roles.guard';
import { Role } from 'src/shared/enums/role.enum';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { UpdateJobseekerProfileDto } from './dto/update-jobseeker-profile.dto';
// import { LocalAuthGuard } from 'src/guards/local-auth.guard';
// import { Public } from 'src/shared/decorators/auth/public.decorator';
import { UserService } from './user.service';


@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


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

  // @Post('push-notification/:userID')
  // @Roles(Role.Company)
  // pushNotificationJobseeker(@Param('userID') id: Types.ObjectId, @Body() updateJobseekerProfileDto: UpdateJobseekerProfileDto) {
  //   return this.userService.pushNotificationJobseeker(id, updateJobseekerProfileDto);
  // }

}
