import { Module } from '@nestjs/common';
import { PopularPositionsService } from './popular-positions.service';
import { PopularPositionsController } from './popular-positions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { popularPositionsSchema } from './entities/popular-position.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'popular-positions', schema: popularPositionsSchema }])],
  exports: [PopularPositionsService],
  controllers: [PopularPositionsController],
  providers: [PopularPositionsService]
})
export class PopularPositionsModule {}
