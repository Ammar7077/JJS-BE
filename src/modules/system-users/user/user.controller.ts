import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
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

  @Get(':userID')
  findOne(@Param('userID') id: Types.ObjectId) {
    return this.userService.findOneByID(id);
  }
}
