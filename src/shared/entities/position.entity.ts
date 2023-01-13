import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type PositionDocument = HydratedDocument<Position>;

@Schema({
  validateBeforeSave: true,
  timestamps: true,
})
export class Position extends Document {
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
export const PositionSchema = SchemaFactory.createForClass(Position);
