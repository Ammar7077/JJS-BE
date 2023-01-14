import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Roles } from 'src/guards/roles.guard';
import { Role } from 'src/shared/enums/role.enum';
import { FilterJobseekersDto } from './dto/filter-jobseekers.dto';
import { PushNotificationDto } from './dto/push-notification.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { UpdateJobseekerProfileDto } from './dto/update-jobseeker-profile.dto';
import { UpdateJobseekerSkillsDto } from './dto/update-jobseeker-skills.dto';
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

  @Get('filter-jobseekers/')
  filter(@Query() query: FilterJobseekersDto) {
    return this.userService.filterJobSeekers(query);
  }

  @Get('skills')
  skill() {
    return this.userService.findSkills();
  }

  @Get('positions')
  position() {
    return this.userService.findPositions();
  }

  @Get('companies')
  getAllCompanies() {
    return this.userService.getAllCompanies();
  }

  @Get('jobseekers')
  getAllJobseekers() {
    return this.userService.getAllJobseekers();
  }

  @Get(':userID')
  findOne(@Param('userID') id: Types.ObjectId) {
    return this.userService.findOneByID(id);
  }

  @Patch('admin-hide-users/:userID')
  hideUsersByAdmin(@Param('userID') userID: Types.ObjectId, @Body() isHidden) {
    return this.userService.hideUsersByAdmin(userID, isHidden);
  }

  @Patch('update-company-profile/:userID')
  @Roles(Role.Company)
  updateCompanyProfile(
    @Param('userID') id: Types.ObjectId,
    @Body() updateCompanyProfileDto: UpdateCompanyProfileDto,
  ) {
    return this.userService.updateCompanyProfile(id, updateCompanyProfileDto);
  }

  @Patch('update-jobseeker-profile/:userID')
  @Roles(Role.Jobseeker)
  updateJobseekerProfile(
    @Param('userID') id: Types.ObjectId,
    @Body() updateJobseekerProfileDto: UpdateJobseekerProfileDto,
  ) {
    return this.userService.updateJobseekerProfile(
      id,
      updateJobseekerProfileDto,
    );
  }

  @Patch('update-skills/:jobseekerID')
  addAndUpdateNewSkill(
    @Param('jobseekerID') id: Types.ObjectId,
    @Body() updateJobseekerSkillsDto: UpdateJobseekerSkillsDto,
  ) {
    return this.userService.updateAndAddNewSkill(id, updateJobseekerSkillsDto);
  }

  @Patch('favourite/:userID')
  addToFavourite(@Param('userID') id: Types.ObjectId, @Req() req: any) {
    return this.userService.addToFavourite(id, req.user.sub);
  }

  @Post('push-notification/:userID')
  pushNotification(
    @Param('userID') id: Types.ObjectId,
    @Body() pushNotificationDto: PushNotificationDto,
  ) {
    return this.userService.pushNotification(id, pushNotificationDto);
  }
}
