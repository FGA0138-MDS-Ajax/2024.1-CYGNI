import { Test, TestingModule } from '@nestjs/testing';
import { FichaGerencialController } from './ficha-gerencial.controller';

describe('FichaGerencialController', () => {
  let controller: FichaGerencialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FichaGerencialController],
    }).compile();

    controller = module.get<FichaGerencialController>(FichaGerencialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
