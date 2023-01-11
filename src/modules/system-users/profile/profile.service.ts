import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
import { Role } from 'src/shared/enums/role.enum';
import { User, UserDocument } from '../user/entities/user.entity';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { UpdateJobseekerProfileDto } from './dto/update-job-seeker-profile.dto';

@Injectable()
export class ProfileService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async updateCompanyProfile(
    userID: Types.ObjectId,
    updateCompanyProfileDto: UpdateCompanyProfileDto,
  ): Promise<User | null> {
    const update = await this.userModel.findByIdAndUpdate(userID, {
      ...updateCompanyProfileDto,
      role: Role.Company,
    });
    emptyDocument(update, 'user');
    return update;
  }

  async updateJobseekerProfile(
    userID: Types.ObjectId,
    updateJobseekerProfileDto: UpdateJobseekerProfileDto,
  ): Promise<User | null> {
    const update = await this.userModel.findByIdAndUpdate(userID, {
      ...updateJobseekerProfileDto,
      role: Role.Jobseeker,
    });
    emptyDocument(update, 'user');
    return update;
  }
}
