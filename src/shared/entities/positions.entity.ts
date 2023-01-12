import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class Positions extends Document {
  @Prop({
    type: String,
    minlength: [5, 'Position'],
  })
  position: string;

  @Prop({
    cast: 'Something went wrong with Position Hits',
    type: [{ type: String }],
  })
  hits: string[];
}
export const PositionsSchema = SchemaFactory.createForClass(Positions);
