import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PopularPositionsService } from './popular-positions.service';
import { CreatePopularPositionDto } from './dto/create-popular-position.dto';
import { UpdatePopularPositionDto } from './dto/update-popular-position.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('popular-positions')
@Controller('popular-positions')
export class PopularPositionsController {
  constructor(private readonly popularPositionsService: PopularPositionsService) {}

  @Post()
  create(@Body() createPopularPositionDto: CreatePopularPositionDto) {
    return this.popularPositionsService.create(createPopularPositionDto);
  }

  @Get()
  findAll() {
    return this.popularPositionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.popularPositionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePopularPositionDto: UpdatePopularPositionDto) {
    return this.popularPositionsService.update(+id, updatePopularPositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.popularPositionsService.remove(+id);
  }
}
