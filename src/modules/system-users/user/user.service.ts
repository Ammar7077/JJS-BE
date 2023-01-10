import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model, Types } from 'mongoose';
import { PopularPositions, PopularPositionsDocument } from 'src/modules/popular-positions/entities/popular-position.entity';
import { PopularSkills, PopularSkillsDocument } from 'src/modules/popular-skills/entities/popular-skill.entity';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
import { Role } from 'src/shared/enums/role.enum';
import { checkArrayNullability, checkNullability } from 'src/shared/util/check-nullability.util';
import { cleanObject } from 'src/shared/util/clean-object.util';
import { FilterJobseekersDto } from './dto/filter-jobseekers.dto';
import { PushNotificationDto } from './dto/push-notification.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { UpdateJobseekerProfileDto } from './dto/update-jobseeker-profile.dto';
import { UpdateJobseekerSkillsDto } from './dto/update-jobseeker-skills.dto';
import { UserDocument, User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
  @InjectModel(PopularSkills.name) private readonly popularSkillsModel: Model<PopularSkillsDocument>,
    @InjectModel(PopularPositions.name) private readonly popularPositionsModel: Model<PopularPositionsDocument>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async getAllCompanies(): Promise<User[]> {
    return this.userModel.find({
      role: Role.Company
    });
  }

  async getAllJobseekers(): Promise<User[]> {
    return this.userModel.find({
      role: Role.Jobseeker
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    let user = await this.userModel.findOne({ email });
    if (!user)
      throw new HttpException(
        'auth.errors.wrongEmailOrPassword',
        HttpStatus.BAD_REQUEST,
      );

    cleanObject(user);
    return user;
  }

  async findOneByID(userID: Types.ObjectId): Promise<User | null> {
    const user: User | null = await this.userModel.findById(userID);
    emptyDocument(user, 'user');
    return user;
  }

  async updateCompanyProfile(userID: Types.ObjectId, updateCompanyProfileDto: UpdateCompanyProfileDto): Promise<User | null> {
    const update = await this.userModel.findByIdAndUpdate(userID, {...updateCompanyProfileDto, role: Role.Company});
    emptyDocument(update, 'user');
    return update;
  }


  async updateJobseekerProfile(userID: Types.ObjectId, updateJobseekerProfileDto: UpdateJobseekerProfileDto): Promise<User | null> {
    const update = await this.userModel.findByIdAndUpdate(userID, {...updateJobseekerProfileDto, role: Role.Jobseeker});
    emptyDocument(update, 'user');
    return update;
  }

  async updateAndAddNewSkill(id: Types.ObjectId, updateJobseekerSkillsDto: UpdateJobseekerSkillsDto) {
    try {
      new Types.ObjectId(`${id}`);
    } catch (err) {
      return { "wrong id": id };
    }
    const updateSkill = await this.userModel
    .findByIdAndUpdate(id, { $push: {
      "skills": { "skillName": updateJobseekerSkillsDto.skillName,
          "skillValue": updateJobseekerSkillsDto.skillValue,
          "skillDate": new Date,
          "isDeleted": false
        }}}).setOptions({ overwrite: false });

    if (!updateSkill) {
      Logger.log(`update skills error`);
      throw new NotFoundException();
    }
    return updateSkill;
  }


  async pushNotification(userID: Types.ObjectId, pushNotificationDto: PushNotificationDto): Promise<Object> {

    /// Ex.: Notification for Jobseeker about:: Having an interview/feedback and save it in the history
    /// type: interview/feedback/report/position
    const pushNotification = await this.userModel
    .findByIdAndUpdate(userID, { $push: {
      "notifications": {
          "senderID": pushNotificationDto.senderID,
          "type": pushNotificationDto.type,
          "senderName": pushNotificationDto.senderName,
          "title": pushNotificationDto.title,
          "body": pushNotificationDto.body,
          "location": pushNotificationDto.location,
          "link": pushNotificationDto.link,
          "interviewStart": pushNotificationDto.interviewStart,
          "interviewEnd": pushNotificationDto.interviewEnd,
          "position": pushNotificationDto.position,
          "isAccepted": pushNotificationDto.isAccepted,
        }}}).setOptions({ overwrite: false });
        emptyDocument(pushNotification, 'user');

        /// Ex.: Notification for company about:: Save req interview/feedback in to Company history
        const saveInToHistory = await this.userModel
    .findByIdAndUpdate(pushNotificationDto.senderID, { $push: {
      "notifications": {
          "senderID": userID,
          "type": pushNotificationDto.type,
          "senderName": pushNotificationDto.senderName,
          "title": pushNotificationDto.title,
          "body": pushNotificationDto.body,
          "location": pushNotificationDto.location,
          "link": pushNotificationDto.link,
          "interviewStart": pushNotificationDto.interviewStart,
          "interviewEnd": pushNotificationDto.interviewEnd,
          "position": pushNotificationDto.position,
          "isAccepted": pushNotificationDto.isAccepted,
        }}}).setOptions({ overwrite: false });
        emptyDocument(saveInToHistory, 'user');

    return {"request sent": true};
  }


  async filterJobSeekers(query: FilterJobseekersDto): Promise<User[]> {
    let { gender, minAge, maxAge, skills, isExperienced, positions, languages, location, typeOfWork } = query;

    gender = gender?.trim();
    
    minAge = minAge?.trim();
    maxAge = maxAge?.trim();
    
    location = location?.trim();
    isExperienced = isExperienced?.trim();
    typeOfWork = typeOfWork?.trim();
    skills = (skills as unknown as string)?.trim().split(',') ?? [''];
    positions = (positions as unknown as string)?.trim().split(',') ?? [''];
    languages = (languages as unknown as string)?.trim().split(',') ?? [''];

    for(let i = 0; i < skills.length; ++i) {
      await new this.popularSkillsModel({ skills: skills[i].trim(), filterDate: new Date }).save();
    }

    for(let i = 0; i < positions.length; ++i) {
      await new this.popularPositionsModel({ positions: positions[i].trim(), filterDate: new Date }).save();
    }

    const currentDate = new Date();
    let minDob: Date;
    let maxDob: Date;
    if(checkNullability(minAge) && checkNullability(maxAge)){
      minDob = moment(currentDate).subtract(maxAge, 'years').toDate();
      maxDob = moment(currentDate).subtract(minAge, 'years').toDate();
    }
    
    const filteredJobseekers = await this.userModel.find({
      $and: [
        { role: Role.Jobseeker },
        
        // * Done * //
        checkNullability(gender) ? { gender : { $eq: gender } } : {},
        
        // * Done * //
        checkNullability(location) ? { location : { $eq: location } } : {},

        // * Done * //
        checkNullability(typeOfWork) ? { typeOfWork : { $eq: typeOfWork } } : {},

        // // * Done * //
        // { dob: { $gte: minDob, $lte: maxDob } },

        // * Done * //
        checkArrayNullability(skills) ? { "skills.skillName": { $in: skills } } : {},
        checkArrayNullability(skills) ? { "skills.isDeleted": false } : {},

        // * Done * //
        checkArrayNullability(languages) ? { "languages.languageName": { $in: languages } } : {},

        // // * Done * //
        // checkArrayNullability(positions) ? { wantedPositions: { $in: positions } } : {},

        // // * Done * //
        // checkNullability(isExperienced) ? { "experiences.companyName": { $exists: true } } : {},
      ]
    });
    return filteredJobseekers;
  }
}
