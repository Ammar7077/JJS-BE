import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ReturnMessage } from 'src/shared/interfaces/return-message.interface';
import { Payload } from 'src/shared/interfaces/token-payload.interface';
import { UserDocument, User } from '../system-users/user/entities/user.entity';
import { UserService } from '../system-users/user/user.service';
import { CreateJobseekerDto } from '../system-users/user/dto/create-jobseeker.dto';
import { Role } from 'src/shared/enums/role.enum';
import { registerUser } from 'src/shared/util/register-user.util';
import { CreateCompanyDto } from '../system-users/user/dto/create-company.dto';

@Injectable()
export class AuthService {
  constructor(
    // * Models
    @InjectModel('User') private userModel: Model<UserDocument>,
    // * Services
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async registerJobseeker(createJobseekerDto: CreateJobseekerDto): Promise<ReturnMessage> {
    const user = new this.userModel(createJobseekerDto);
    user.role = Role.Jobseeker;
    return await registerUser(user);
  }

  async registerCompany(createCompanyDto: CreateCompanyDto): Promise<ReturnMessage> {
    const user = new this.userModel(createCompanyDto);
    user.role = Role.Company;
    user.isHidden = true;
    return await registerUser(user);
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
