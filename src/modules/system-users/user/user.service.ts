import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
// import { Role } from 'src/shared/enums/role.enum';
import { cleanObject } from 'src/shared/util/clean-object.util';
import { PushNotificationDto } from './dto/push-notification.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';
import { UpdateJobseekerProfileDto } from './dto/update-jobseeker-profile.dto';
import { UserDocument, User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find();
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
    const update = await this.userModel.findByIdAndUpdate(userID, updateCompanyProfileDto);
    emptyDocument(update, 'user');
    return update;
  }


  async updateJobseekerProfile(userID: Types.ObjectId, updateJobseekerProfileDto: UpdateJobseekerProfileDto): Promise<User | null> {
    const update = await this.userModel.findByIdAndUpdate(userID, updateJobseekerProfileDto);
    emptyDocument(update, 'user');
    return update;
  }


  async pushNotification(userID: Types.ObjectId, pushNotificationDto: PushNotificationDto): Promise<User | null> {

    /// Ex.: Notification for Jobseeker about:: Having an interview/feedback and save it in the history
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

    return pushNotification;
  }

}
