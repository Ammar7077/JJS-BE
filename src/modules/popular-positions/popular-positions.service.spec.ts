import { Test, TestingModule } from '@nestjs/testing';
import { PopularPositionsService } from './popular-positions.service';

describe('PopularPositionsService', () => {
  let service: PopularPositionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopularPositionsService],
    }).compile();

    service = module.get<PopularPositionsService>(PopularPositionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
