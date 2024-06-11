import { Test, TestingModule } from '@nestjs/testing';
import { DocumentoController } from './documento.controller';

describe('DocumentoController', () => {
  let controller: DocumentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentoController],
    }).compile();

    controller = module.get<DocumentoController>(DocumentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
