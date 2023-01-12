import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/shared/enums/role.enum';
import {
  checkNullability,
  checkArrayNullability,
} from 'src/shared/util/check-nullability.util';
import { User, UserDocument } from '../user/entities/user.entity';
import { FilterJobSeekersDto } from './dto/filter-job-seekers.dto';

@Injectable()
export class JobSeekerService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async filterJobSeekers(query: FilterJobSeekersDto): Promise<User[]> {
    let {
      gender,
      //  minAge, maxAge,
      skills,
      months,
      years,
      positions,
      languages,
      location,
      typeOfWork,
    } = query;

    gender = gender?.trim();

    months = Number(months);
    years = Number(years);
    location = location?.trim();
    typeOfWork = typeOfWork?.trim();
    skills = (skills as unknown as string)?.trim().split(',') ?? [];
    positions = (positions as unknown as string)?.trim().split(',') ?? [];
    languages = (languages as unknown as string)?.trim().split(',') ?? [''];

    // for (let i = 0; i < skills.length; ++i) {
    //   await new this.popularSkillsModel({
    //     skills: skills[i].trim(),
    //     filterDate: new Date(),
    //   }).save();
    // }

    // for (let i = 0; i < positions.length; ++i) {
    //   await new this.popularPositionsModel({
    //     positions: positions[i].trim(),
    //     filterDate: new Date(),
    //   }).save();
    // }

    const filteredJobSeekers = await this.userModel.find({
      $and: [
        { role: Role.Jobseeker },
        checkNullability(gender) ? { gender: { $eq: gender } } : {},
        checkNullability(location) ? { location: { $eq: location } } : {},
        checkNullability(typeOfWork) ? { typeOfWork: { $eq: typeOfWork } } : {},

        checkArrayNullability(skills)
          ? { 'skills.skillName': { $in: skills } }
          : {},

        checkArrayNullability(skills) ? { 'skills.isDeleted': false } : {},

        checkArrayNullability(languages)
          ? { 'languages.langName': { $in: languages } }
          : {},

        checkArrayNullability(positions)
          ? { wantedPositions: { $in: positions } }
          : {},

        checkNullability(years) ? { 'experiences.years': { $gte: years } } : {},

        checkNullability(months)
          ? { 'experiences.months': { $gte: months } }
          : {},
      ],
    });
    return filteredJobSeekers;
  }

  async getAllJobSeekers(): Promise<User[]> {
    return this.userModel.find({
      role: Role.Jobseeker,
    });
  }
}
