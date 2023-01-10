import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePopularPositionDto } from './dto/create-popular-position.dto';
import { UpdatePopularPositionDto } from './dto/update-popular-position.dto';
import { PopularPositionsDocument } from './entities/popular-position.entity';

@Injectable()
export class PopularPositionsService {
  constructor(@InjectModel('popular-positions') private readonly popularPositionsModel: Model<PopularPositionsDocument>) { }
  create(createPopularPositionDto: CreatePopularPositionDto) {
    return 'This action adds a new popularPosition';
  }

  findAll() {
    return this.popularPositionsModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} popularPosition`;
  }

  update(id: number, updatePopularPositionDto: UpdatePopularPositionDto) {
    return `This action updates a #${id} popularPosition`;
  }

  remove(id: number) {
    return `This action removes a #${id} popularPosition`;
  }
}
