import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type SkillDocument = HydratedDocument<Skill>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class Skill extends Document {
  @Prop({
    type: String,
    minlength: [1, 'Skill Name must be more than 1 character'],
    maxlength: [30, 'Skill Name must be less than 30 character'],
    cast: 'Something Went wrong with the skill name',
    trim: true,
    unique: true,
  })
  skill: string;

  @Prop({
    cast: 'Something went wrong with Skill Date',
    type: [{ type: String }],
  })
  hits: string[];
}
export const SkillSchema = SchemaFactory.createForClass(Skill);
