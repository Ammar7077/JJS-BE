import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PopularPositionsDocument = HydratedDocument<PopularPositions>;

@Schema()
export class PopularPositions {
  @Prop()
  positions: string;

  @Prop({
    type: String,
    default: Date
  })
  filterDate: string;
}

export const popularPositionsSchema = SchemaFactory.createForClass(PopularPositions);