import { Test, TestingModule } from '@nestjs/testing';
import { PopularPositionsController } from './popular-positions.controller';
import { PopularPositionsService } from './popular-positions.service';

describe('PopularPositionsController', () => {
  let controller: PopularPositionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PopularPositionsController],
      providers: [PopularPositionsService],
    }).compile();

    controller = module.get<PopularPositionsController>(PopularPositionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
