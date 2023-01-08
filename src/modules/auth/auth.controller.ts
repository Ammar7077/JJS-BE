import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Public } from 'src/shared/decorators/auth/public.decorator';
import { CreateCompanyDto } from '../system-users/user/dto/create-company.dto';
import { CreateJobseekerDto } from '../system-users/user/dto/create-jobseeker.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    status: 201,
    description: 'The User has been successfully created, and can login now',
  })
  @ApiBadRequestResponse({ status: 400, description: 'If Email Exists.' })
  @Public()
  @Post('register-jobseeker')
  registerJobseeker(@Body() createJobseekerDto: CreateJobseekerDto) {
    return this.authService.registerJobseeker(createJobseekerDto);
  }


  @ApiCreatedResponse({
    status: 201,
    description: 'The User has been successfully created, and can login now',
  })
  @ApiBadRequestResponse({ status: 400, description: 'If Email Exists.' })
  @Public()
  @Post('register-company')
  registerCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.authService.registerCompany(createCompanyDto);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Logged in successfully, token is in the response json',
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: LoginDto) {
    return this.authService.login(req);
  }
}
