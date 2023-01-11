import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/shared/enums/role.enum';
import { User, UserDocument } from '../user/entities/user.entity';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async getAllCompanies(): Promise<User[]> {
    return this.userModel.find({
      role: Role.Company,
    });
  }
}
