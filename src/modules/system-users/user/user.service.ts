import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { emptyDocument } from 'src/shared/db-error-handling/empty-document.middleware';
import { cleanObject } from 'src/shared/util/clean-object.util';
import { UserDocument, User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

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

  findByIDAndUpdate(userID: Types.ObjectId, update: any) {
    return this.userModel.findByIdAndUpdate(update);
  }
}
