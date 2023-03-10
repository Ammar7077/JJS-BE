import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ReturnMessage } from 'src/shared/interfaces/return-message.interface';
import { Payload } from 'src/shared/interfaces/token-payload.interface';
import { UserDocument, User } from '../system-users/user/entities/user.entity';
import { UserService } from '../system-users/user/user.service';
import { CreateJobSeekerDto } from '../system-users/job-seeker/dto/create-job-seeker.dto';
import { Role } from 'src/shared/enums/role.enum';
import { CreateCompanyDto } from '../system-users/company/dto/create-company.dto';

@Injectable()
export class AuthService {
  constructor(
    // * Models
    @InjectModel('User') private userModel: Model<UserDocument>,
    // * Services
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async registerJobseeker(
    createJobseekerDto: CreateJobSeekerDto,
  ): Promise<ReturnMessage> {
    const user = new this.userModel(createJobseekerDto);
    user.role = Role.Jobseeker;
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    return { message: 'auth.success.register', statusCode: 201 };
  }

  async registerCompany(
    createCompanyDto: CreateCompanyDto,
  ): Promise<ReturnMessage> {
    const user = new this.userModel(createCompanyDto);
    user.role = Role.Company;
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    return { message: 'auth.success.register', statusCode: 201 };
  }

  async login(req: any): Promise<{ token: string }> {
    const userID = req?.user?._doc?._id;
    const user = await this.userModel.findById(userID);

    const payload: Payload = {
      sub: user?._id,
      role: user?.role,
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.TOKEN_SECRET,
      expiresIn: process.env.EXPIRES_IN,
    });
    return { token };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user: User = await this.userService.findOneByEmail(email);
    if (!user)
      throw new HttpException(
        'auth.errors.wrongEmailOrPassword',
        HttpStatus.BAD_REQUEST,
      );
    const isMatch = await bcrypt.compare(password, user?.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException('auth.errors.wrongInfo', HttpStatus.BAD_REQUEST);
  }
}
