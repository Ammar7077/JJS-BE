import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from 'src/shared/enums/role.enum';
import {
  checkNullability,
  checkArrayNullability,
} from 'src/shared/util/check-nullability.util';
import { User, UserDocument } from '../user/entities/user.entity';
import { FilterJobSeekersDto } from './dto/filter-job-seekers.dto';
import { UpdateJobseekerSkillsDto } from './dto/update-job-seeker-skills.dto';

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

        // * Done * //
        checkNullability(gender) ? { gender: { $eq: gender } } : {},

        // * Done * //
        checkNullability(location) ? { location: { $eq: location } } : {},

        // * Done * //
        checkNullability(typeOfWork) ? { typeOfWork: { $eq: typeOfWork } } : {},

        // * Done * //
        checkArrayNullability(skills)
          ? { 'skills.skillName': { $in: skills } }
          : {},
        checkArrayNullability(skills) ? { 'skills.isDeleted': false } : {},

        // * Done * //
        checkArrayNullability(languages)
          ? { 'languages.langName': { $in: languages } }
          : {},

        // * Done * //
        checkArrayNullability(positions)
          ? { wantedPositions: { $in: positions } }
          : {},

        // * Done * //
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

  async updateAndAddNewSkill(
    id: Types.ObjectId,
    updateJobseekerSkillsDto: UpdateJobseekerSkillsDto,
  ) {
    try {
      new Types.ObjectId(`${id}`);
    } catch (err) {
      return { 'wrong id': id };
    }
    const updateSkill = await this.userModel
      .findByIdAndUpdate(id, {
        $push: {
          skills: {
            skillName: updateJobseekerSkillsDto.skillName,
            skillValue: updateJobseekerSkillsDto.skillValue,
            skillDate: new Date(),
            isDeleted: false,
          },
        },
      })
      .setOptions({ overwrite: false });

    if (!updateSkill) {
      Logger.log(`update skills error`);
      throw new NotFoundException();
    }
    return updateSkill;
  }
}
