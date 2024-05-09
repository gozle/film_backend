import { Test, TestingModule } from '@nestjs/testing';
import { CompressController } from './compress.controller';
import { CompressService } from './compress.service';

describe('CompressController', () => {
  let controller: CompressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompressController],
      providers: [CompressService],
    }).compile();

    controller = module.get<CompressController>(CompressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
