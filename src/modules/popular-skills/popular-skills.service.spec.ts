import { Test, TestingModule } from '@nestjs/testing';
import { PopularSkillsService } from './popular-skills.service';

describe('PopularSkillsService', () => {
  let service: PopularSkillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopularSkillsService],
    }).compile();

    service = module.get<PopularSkillsService>(PopularSkillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
