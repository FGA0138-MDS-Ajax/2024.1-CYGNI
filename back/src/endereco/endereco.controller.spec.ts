import { Test, TestingModule } from '@nestjs/testing';
import { EndereçoController } from './endereco.controller';

describe('EndereçoController', () => {
  let controller: EndereçoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EndereçoController],
    }).compile();

    controller = module.get<EndereçoController>(EndereçoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
