import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PopularSkillsService } from './popular-skills.service';

import { ApiTags } from '@nestjs/swagger';
import { AddPopularSkillsDto } from './dto/add-popular-skill.dto';

@ApiTags('popular-skills')
@Controller('popular-skills')
export class PopularSkillsController {
  constructor(private readonly popularSkillsService: PopularSkillsService) {}

  @Post()
  create(@Body() addPopularSkillsDto: AddPopularSkillsDto) {
    return this.popularSkillsService.addPopular(addPopularSkillsDto);
  }

  @Get()
  findAll() {
    return this.popularSkillsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.popularSkillsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.popularSkillsService.remove(+id);
  }
}
