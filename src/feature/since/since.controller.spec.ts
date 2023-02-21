import { Test, TestingModule } from '@nestjs/testing';
import { SinceController } from './since.controller';
import { SinceService } from './since.service';

describe('SinceController', () => {
  let controller: SinceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SinceController],
      providers: [SinceService],
    }).compile();

    controller = module.get<SinceController>(SinceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
