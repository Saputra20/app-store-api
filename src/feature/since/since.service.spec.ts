import { Test, TestingModule } from '@nestjs/testing';
import { SinceService } from './since.service';

describe('SinceService', () => {
  let service: SinceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SinceService],
    }).compile();

    service = module.get<SinceService>(SinceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
