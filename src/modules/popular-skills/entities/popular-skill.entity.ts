import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
// import { currentDate } from "src/shared/util/date.util";

export type PopularSkillsDocument = HydratedDocument<PopularSkills>;

@Schema()
export class PopularSkills {
  @Prop()
  skills: string;

  @Prop({
    type: String,
    default: Date
  })
  filterDate: string;
}

export const popularSkillsSchema = SchemaFactory.createForClass(PopularSkills);