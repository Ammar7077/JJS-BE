import { PartialType } from '@nestjs/mapped-types';
import { CreatePopularPositionDto } from './create-popular-position.dto';

export class UpdatePopularPositionDto extends PartialType(CreatePopularPositionDto) {}
