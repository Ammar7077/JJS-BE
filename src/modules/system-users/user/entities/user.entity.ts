import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/shared/enums/role.enum';
import { Experiences } from 'src/shared/interfaces/experiences.interface';
import { Languages } from 'src/shared/interfaces/languages.interface';
import { Skills } from 'src/shared/interfaces/skills.interface';

export type UserDocument = HydratedDocument<User>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    required: [true, 'Role is Required'],
    enum: Role,
  })
  role: Role;
  

  /// ==================== name, email, phone, password, location, notifications ================= ///
  @Prop({
    type: String,
    minlength: [2, 'Name must be more than 2 characters'],
    maxlength: [25, 'Name must be less than 25 characters'],
    trim: true,
    required: [true, 'Name must be provided'],
    cast: "Something with wrong with the name"
  })
  name!: string; // company and jobseeker name

  @Prop({
    type: String,
    minlength: [5, 'Email must be more than 5 characters'],
    lowercase: true,
    trim: true,
    unique: true,
    required: [true, 'Email must be provided'],
    cast: "Something with wrong with the user email"
  })
  email!: string; // company and jobseeker registration
  
  @Prop({
    type: String,
    minlength: [5, 'Phone must be more than 5 numbers'],
    maxlength: [16, 'Phone must be less than 16 numbers'],
    trim: true,
    cast: "Something with wrong with the phone number"
  })
  phone!: string; // company and jobseeker

  @Prop({
    type: String,
    required: [true, 'Password must be provided'],
    trim: true,
    cast: "Something with wrong with the password"
  })
  password!: string;

  
  @Prop({
    type: String,
    minlength: [2, 'location must be more than 2 characters'],
    trim: true,
    cast: "Something with wrong with the location"
  })
  location!: string;


  @Prop({
    default: null,
    cast: "Something with wrong with the notification"
  })
  notifications!: any[];
  /// ============================================================ ///


  @Prop({
    type: String,
    minlength: [5, 'String must be more than 5 characters'],
    maxlength: [25, 'String must be less than 25 characters'],
    trim: true,
    cast: "Something with wrong with the company user full name"
  })
  companyUserFullName!: string; // for user company

  @Prop({
    type: String,
    minlength: [5, 'Phone must be more than 5 numbers'],
    maxlength: [16, 'Phone must be less than 16 numbers'],
    trim: true,
    cast: "Something with wrong with the company user phone number"
  })
  companyUserPhone!: string; // company

  @Prop({
    type: String,
    minlength: [2, 'Name must be more than 2 characters'],
    maxlength: [25, 'Name must be less than 25 characters'],
    trim: true,
    cast: "Something with wrong with the company name"
  })
  companyType!: string;

  @Prop({
    type: String,
    trim: true,
    cast: "Something with wrong with the company user phone number"
  })
  desc!: string;

  @Prop({
    type: String,
    minlength: [5, 'Phone must be more than 5 numbers'],
    trim: true,
    cast: "Something with wrong with the company website"
  })
  website!: string;

  @Prop({
    type: [String],
    default: undefined,
    cast: "Something with wrong with the wantedPositions"
  })
  wantedPositions!: string[];


  @Prop({
    type: String,
    length: [1, 'gender must be 1 character'],
    trim: true,
    cast: "Something with wrong with the gender"
  })
  gender!: string;

  @Prop({
    type: String,
    trim: true,
    cast: "Something with wrong with the date"
  })
  dob!: string;

  @Prop({
    type: String,
    trim: true,
    cast: "Something with wrong with the Bio"
  })
  bio!: string;

  @Prop({
    type: String,
    maxlength: [25, 'nationality must be less than 25 characters'],
    trim: true,
    cast: "Something with wrong with the nationality"
  })
  nationality!: string;

  @Prop({
    type: String,
    maxlength: [40, 'education must be less than 40 characters'],
    trim: true,
    cast: "Something with wrong with the education"
  })
  education!: string;

  // no edu / student / bachalor / heigh deploma / master / Dr.
  @Prop({
    type: [String],
    default: undefined,
    cast: "Something with wrong with the company name"
  })
  levelOfEducation!: string[];

  @Prop({
    type: [Object],
    default: undefined,
    cast: "Something with wrong with the jobseeker skills"
  })
  skills!: Skills[];

  // y / n ===> if available go to typeOfWork
  @Prop({
    type: String,
    length: [1, 'isAvailable must be 1 character'],
    trim: true,
    cast: "Something with wrong with the isAvailable"
  })
  isAvailable!: string;

  // y / n
  @Prop({
    type: String,
    length: [1, 'isRemotly must be 1 character'],
    trim: true,
    cast: "Something with wrong with the isRemotly"
  })
  isRemotly!: string;

  // 1: full time, 2: part time, 3: internship/traning, 4: freelancer
  @Prop({
    type: [String],
    default: undefined,
    cast: "Something with wrong with the typeOfWork"
  })
  typeOfWork!: string[];

  @Prop({
    type: [Object],
    default: undefined,
    cast: "Something with wrong with the jobseeker experiences"
  })
  experiences!: Experiences[];

  @Prop({
    type: [Object],
    default: undefined,
    cast: "Something with wrong with the jobseeker languages"
  })
  languages!: Languages[];
}

export const UserSchema = SchemaFactory.createForClass(User);
