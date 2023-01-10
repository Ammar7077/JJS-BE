import { Module } from '@nestjs/common';
import { PopularSkillsService } from './popular-skills.service';
import { PopularSkillsController } from './popular-skills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { popularSkillsSchema } from './entities/popular-skill.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'popular-skills', schema: popularSkillsSchema }])],
  exports: [PopularSkillsService],
  controllers: [PopularSkillsController],
  providers: [PopularSkillsService]
})
export class PopularSkillsModule {}
