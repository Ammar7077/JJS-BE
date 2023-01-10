import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddPopularSkillsDto } from './dto/add-popular-skill.dto';
import { PopularSkillsDocument } from './entities/popular-skill.entity';


@Injectable()
export class PopularSkillsService {
  constructor(@InjectModel('popular-skills') private readonly popularSkillsModel: Model<PopularSkillsDocument>) { }

  async addPopular(addPopularSkillsDto: AddPopularSkillsDto) {
    try {
      return await new this.popularSkillsModel(addPopularSkillsDto).save();
    } catch (err: any) {
      throw new HttpException('error add company', err);
    };
  }

  findAll() {
    return this.popularSkillsModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} popularSkillsAndPosition`;
  }

  remove(id: number) {
    return `This action removes a #${id} popularSkillsAndPosition`;
  }
}
