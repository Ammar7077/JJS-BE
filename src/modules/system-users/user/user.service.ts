import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
import {
  PositionDocument,
  Position,
} from 'src/shared/entities/position.entity';
import { Skill, SkillDocument } from 'src/shared/entities/skill.entity';
import { Role } from 'src/shared/enums/role.enum';
import {
  checkArrayNullability,
  checkNullability,
  checkObjectNullability,
} from 'src/shared/util/check-nullability.util';
import { cleanObject } from 'src/shared/util/clean-object.util';
import { FilterJobseekersDto } from './dto/filter-jobseekers.dto';
import { PushNotificationDto } from './dto/push-notification.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { UpdateJobseekerProfileDto } from './dto/update-jobseeker-profile.dto';
import { UpdateJobseekerSkillsDto } from './dto/update-jobseeker-skills.dto';
import { UserDocument, User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Skill.name)
    private readonly SkillModel: Model<SkillDocument>,
    @InjectModel(Position.name)
    private readonly positionModel: Model<PositionDocument>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async getAllCompanies(): Promise<User[]> {
    return this.userModel.find({
      role: Role.Company,
    });
  }

  async getAllJobseekers(): Promise<User[]> {
    return this.userModel.find({
      role: Role.Jobseeker,
    });
  }

  findSkills() {
    return this.SkillModel.find();
  }

  findPositions() {
    return this.positionModel.find();
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
    const user = await this.userModel.findById(userID)
      .populate("favourites")
    emptyDocument(user, 'user');
    console.log(user)
    return user;
  }

  async hideUsersByAdmin(
    userID: Types.ObjectId,
    isHidden,
  ): Promise<User | null> {
    const update = await this.userModel.findByIdAndUpdate(userID, isHidden);
    emptyDocument(update, 'user');
    return update;
  }

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
    console.log("*****************************************************************************************************")
   await this.addPositionToDB(updateJobseekerProfileDto.wantedPositions)
    emptyDocument(update, 'user');
    return update;
  }

  async addPositionToDB(postions: string[]) {
    for (const postion of postions) {
        const position = await this.positionModel.findOne({ postion })
    if (! checkNullability( position)) { 
      const newPosition = new this.positionModel({ position, hits: [new Date()] }); 
      await newPosition.save() 
    }
    else {
      position.hits.push(new Date().toString())
    }
    console.log(position)
    }
  
  }

  async addToFavourite(
    userID: Types.ObjectId,
    loggedInUser: Types.ObjectId,
  ): Promise<Object | null> {
    const user = await this.userModel.findById(loggedInUser);

    console.log(user.favourites);

    if (!user.favourites.includes(userID as any)) {
      user.favourites.push(userID as any);
    } else {
      user.favourites.splice(user.favourites.indexOf(userID as any), 1);
    }
    await user.save();
    return { 'ID_existes': 'User already added' };
  }


  async updateAndAddNewSkill(
    id: Types.ObjectId,
    updateJobseekerSkillsDto: UpdateJobseekerSkillsDto,
  ): Promise<any> {
    const { skillName, skillValue, isDeleted } = updateJobseekerSkillsDto;
    try {
      new Types.ObjectId(`${id}`);
    } catch (err) {
      return { 'wrong id': id };
    }
    const updateSkill = await this.userModel
      .findByIdAndUpdate(id, {
        $push: {
          skills: {
            skillName,
            skillValue,
            skillDate: new Date(),
            isDeleted,
          },
        },
      })
      .setOptions({ overwrite: false });

    if (!updateSkill) {
      Logger.log(`update skills error`);
      throw new NotFoundException();
    }

    await this.addSkillsToDB(skillName);

    return updateSkill;
  }

  async addSkillsToDB(skill: string) {
    const skillObject = await this.SkillModel.findOne({ skill });

    if (!checkObjectNullability(skillObject)) {
      const newSkill = new this.SkillModel({
        skill: skill,
        hits: [new Date()],
      });

      await newSkill.save();
    } else {
      skillObject.hits.push(new Date().toString());
      await skillObject.save();
    }
  }

  async pushNotification(
    userID: Types.ObjectId,
    pushNotificationDto: PushNotificationDto,
  ): Promise<Object> {
    const {
      senderID,
      type,
      senderName,
      title,
      body,
      location,
      link,
      interviewStart,
      interviewEnd,
      position,
      isAccepted,
    } = pushNotificationDto;
    /// Ex.: Notification for Jobseeker about:: Having an interview/feedback and save it in the history
    /// type: interview/feedback/report/position
    const pushNotification = await this.userModel
      .findByIdAndUpdate(userID, {
        $push: {
          notifications: {
            senderID: senderID,
            type: type,
            senderName: senderName,
            title: title,
            body: body,
            location: location,
            link: link,
            interviewStart: interviewStart,
            interviewEnd: interviewEnd,
            position: position,
            isAccepted: isAccepted,
          },
        },
      })
      .setOptions({ overwrite: false });
    emptyDocument(pushNotification, 'user');

    /// Ex.: Notification for company about:: Save req interview/feedback in to Company history
    const saveInToHistory = await this.userModel
      .findByIdAndUpdate(senderID, {
        $push: {
          notifications: {
            senderID: userID,
            type: type,
            senderName: senderName,
            title: title,
            body: body,
            location: location,
            link: link,
            interviewStart: interviewStart,
            interviewEnd: interviewEnd,
            position: position,
            isAccepted: isAccepted,
          },
        },
      })
      .setOptions({ overwrite: false });
    emptyDocument(saveInToHistory, 'user');

    return { 'request sent': true };
  }

  async filterJobSeekers(query: FilterJobseekersDto): Promise<User[]> {
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
      isRemotly,
      isAvailable,
    } = query;

    gender = gender?.trim();

    // const min = Number(minAge?.trim());
    // const max = Number(maxAge?.trim());
    isRemotly = isRemotly?.trim();
    isAvailable = isAvailable?.trim();

    months = Number(months);
    years = Number(years);
    location = location?.trim();
    typeOfWork = typeOfWork?.trim();
    skills = (skills as unknown as string)?.trim().split(',') ?? [];
    positions = (positions as unknown as string)?.trim().split(',') ?? [];
    languages = (languages as unknown as string)?.trim().split(',') ?? [''];

    // const currentDate = new Date();
    // const dateYear = new Date(moment(`${currentDate.getFullYear() - min}/01/01`).format('yyyy-MM-DD'));

    // console.log(`${typeof dateYear} ===== ${dateYear}`);

    // const year = 1000*60*60*24*365.25;
    // let minDob: Date;
    // let maxDob: Date;
    // if(checkNullability(minAge) && checkNullability(maxAge)){
    //   minDob = moment(currentDate).subtract(maxAge, 'years').toDate();
    //   console.log(minDob);
    //   maxDob = moment(currentDate).subtract(minAge, 'years').toDate();
    //   console.log(maxDob);
    // }

    // const minDob = new Date(new Date().setFullYear(new Date().getFullYear() - min));
    // const maxDob = new Date(new Date().setFullYear(new Date().getFullYear() - max));
    // const thisYear = new Date().getFullYear;

    const filteredJobseekers = await this.userModel.find({
      $and: [
        { role: Role.Jobseeker },

        // * Done * //
        checkNullability(gender) ? { gender: { $eq: gender } } : {},

        // * Done * //
        checkNullability(location) ? { location: { $eq: location } } : {},

        // * Done * //
        checkNullability(typeOfWork) ? { typeOfWork: { $eq: typeOfWork } } : {},

        checkNullability(isRemotly) ? { isRemotly: { $eq: isRemotly } } : {},

        checkNullability(isAvailable)
          ? { isAvailable: { $eq: isAvailable } }
          : {},

        // // * Done * //
        // {
        //   dob: {
        //     $and: [
        //       { $gte: [ { $subtract: [ currentDate, '$dob' ] }, min ] },
        //       { $lte: [ { $subtract: [ currentDate, '$dob' ] }, max ] },
        //     ]
        //   }
        // },

        // {
        //   $expr: {
        //     $and: [
        //       { $gte: [{ $divide: [{ $subtract: [moment().toDate(), '$dob'] }, 31536000000] }, min] },
        //       { $lte: [{ $divide: [{ $subtract: [moment().toDate(), '$dob'] }, 31536000000] }, max] },
        //     ],
        //   },
        // },

        // min != 0 && max != 0 ?
        // {
        //   dob:
        //     {
        //       $gt: {
        //         $subtract: [thisYear, "$dob"]
        //       }, $lt: [thisYear, "$dob"]
        //     }
        // } : {},

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
    return filteredJobseekers;
  }
}
