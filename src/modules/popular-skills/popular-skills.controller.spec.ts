import { Test, TestingModule } from '@nestjs/testing';
import { PopularSkillsController } from './popular-skills.controller';
import { PopularSkillsService } from './popular-skills.service';

describe('PopularSkillsController', () => {
  let controller: PopularSkillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PopularSkillsController],
      providers: [PopularSkillsService],
    }).compile();

    controller = module.get<PopularSkillsController>(PopularSkillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
