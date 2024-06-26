import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { getModelToken } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Usuario } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

const mockUsuario = {
  nomeCompleto: 'Test User',
  matricula: '12345',
  nomeGuerra: 'TUser',
  nomeMae: 'Test Mother',
  nomePai: 'Test Father',
  sexo: 'M',
  dataDeNascimento: new Date('1990-01-01'),
  tipoSanguineo: 'O+',
  estadoCivil: 'Single',
  email: 'test@example.com',
  telefone: '123456789',
  postGrad: 'Grad',
  escolaridade: 'High School',
  rg: '123456789',
  cpf: '123.456.789-00',
  matSiape: '12345',
  cnhProntuario: '123456789',
  cnhCategoria: 'B',
  cnhValidade: new Date('2030-01-01'),
  cep: '12345-678',
  bairro: 'Test Neighborhood',
  cidade: 'Test City',
  uf: 'TS',
  logradouro: 'Test Street, 123',
  classificacao: 'Class A',
  funcao: 'Function',
  escala: 'Scale',
  horarioEscala: '09:00-18:00',
  lotacao: 'Test Location',
  comportamento: 'Good',
  porteArma: true,
  admissao: new Date('2020-01-01'),
  apresentacao: new Date('2020-01-02'),
  validadeBienal: new Date('2022-01-01'),
  validadeTAF: new Date('2022-01-01'),
  motivo: 'Reason',
  anoReferencia: 2021,
  dataInicio: new Date('2021-01-01'),
  dataTermino: new Date('2021-01-10'),
  dias: 10,
  observacoes: 'Observations',
  ultimoEditor: 'Editor Name',
};
class MockQuery {
  exec = jest.fn();
}

const mockUsuarioModel = {
  create: jest.fn().mockResolvedValue({ _id: 'someId', ...mockUsuario }),
  find: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue([mockUsuario])
  }),
  findOne: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockUsuario)
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockUsuario)
  }),
  findOneAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue({ _id: 'someId', ...mockUsuario })
  }),
  findOneAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockUsuario)
  }),
};

describe('UsuariosService', () => {
  let service: UsuariosService;
  let model: Model<Usuario>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: getModelToken(Usuario.name),
          useValue: mockUsuarioModel,
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    model = module.get<Model<Usuario>>(getModelToken(Usuario.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUsuarioDto: CreateUsuarioDto = { ...mockUsuario };

      const result = await service.create(createUsuarioDto);
      expect(result).toEqual({ _id: 'someId', ...createUsuarioDto });
      expect(mockUsuarioModel.create).toHaveBeenCalledWith(createUsuarioDto);
    });

    it('should throw an error if create fails', async () => {
      jest.spyOn(mockUsuarioModel, 'create').mockRejectedValueOnce(new Error('Test Error'));

      const createUsuarioDto: CreateUsuarioDto = { ...mockUsuario };

      await expect(service.create(createUsuarioDto)).rejects.toThrow('Test Error');
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockUsuario]);
      expect(mockUsuarioModel.find).toHaveBeenCalled();
    });
  });

  describe('findByNameOrMatriculaOrId', () => {
    it('should return a user by id', async () => {
      jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(true);
      (mockUsuarioModel.findById().exec as jest.Mock).mockResolvedValueOnce(mockUsuario);

      const result = await service.findByNameOrMatriculaOrId(undefined, undefined, 'someId');
      expect(result).toEqual(mockUsuario);
      expect(mockUsuarioModel.findById).toHaveBeenCalledWith('someId');
    });

    it('should return a user by nomeCompleto', async () => {
      (mockUsuarioModel.find().exec as jest.Mock).mockResolvedValueOnce([mockUsuario]);

      const result = await service.findByNameOrMatriculaOrId('Test User');
      expect(result).toEqual([mockUsuario]);
      expect(mockUsuarioModel.find).toHaveBeenCalledWith({ nomeCompleto: { $regex: 'Test User', $options: 'i' } });
    });

    it('should return a user by matricula', async () => {
      (mockUsuarioModel.findOne().exec as jest.Mock).mockResolvedValueOnce(mockUsuario);

      const result = await service.findByNameOrMatriculaOrId(undefined, '12345');
      expect(result).toEqual(mockUsuario);
      expect(mockUsuarioModel.findOne).toHaveBeenCalledWith({ matricula: '12345' });
    });

    it('should throw a BadRequestException if no parameters are provided', async () => {
      await expect(service.findByNameOrMatriculaOrId()).rejects.toThrow(BadRequestException);
    });

    it('should throw an InternalServerErrorException if findById fails', async () => {
      jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(true);
      (mockUsuarioModel.findById().exec as jest.Mock).mockRejectedValueOnce(new Error('Test Error'));

      await expect(service.findByNameOrMatriculaOrId(undefined, undefined, 'someId')).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(true);
      const updateUsuarioDto: UpdateUsuarioDto = { ...mockUsuario };

      (mockUsuarioModel.findOneAndUpdate().exec as jest.Mock).mockResolvedValueOnce({ _id: 'someId', ...mockUsuario });

      const result = await service.update(updateUsuarioDto, undefined, undefined, 'someId');
      expect(result).toEqual({ _id: 'someId', ...mockUsuario });
      expect(mockUsuarioModel.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: 'someId' },
        updateUsuarioDto,
        { new: true }
      );
    });

    it('should throw a NotFoundException if user is not found', async () => {
      (mockUsuarioModel.findOneAndUpdate().exec as jest.Mock).mockResolvedValueOnce(null);
      const updateUsuarioDto: UpdateUsuarioDto = { ...mockUsuario };

      await expect(service.update(updateUsuarioDto, undefined, undefined, 'someId')).rejects.toThrow(NotFoundException);
    });

    it('should throw an InternalServerErrorException for other errors', async () => {
      jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(true);
      (mockUsuarioModel.findOneAndUpdate().exec as jest.Mock).mockRejectedValueOnce(new Error('Test Error'));
      const updateUsuarioDto: UpdateUsuarioDto = { ...mockUsuario };

      await expect(service.update(updateUsuarioDto, undefined, undefined, 'someId')).rejects.toThrow(InternalServerErrorException);
    });

    it('should update a user by nomeCompleto', async () => {
      const updateUsuarioDto: UpdateUsuarioDto = { ...mockUsuario };
      (mockUsuarioModel.findOneAndUpdate().exec as jest.Mock).mockResolvedValueOnce({ _id: 'someId', ...mockUsuario });

      const result = await service.update(updateUsuarioDto, 'Test User');
      expect(result).toEqual({ _id: 'someId', ...mockUsuario });
      expect(mockUsuarioModel.findOneAndUpdate).toHaveBeenCalledWith(
        { nomeCompleto: 'Test User' },
        updateUsuarioDto,
        { new: true }
      );
    });

    it('should update a user by matricula', async () => {
      const updateUsuarioDto: UpdateUsuarioDto = { ...mockUsuario };
      (mockUsuarioModel.findOneAndUpdate().exec as jest.Mock).mockResolvedValueOnce({ _id: 'someId', ...mockUsuario });

      const result = await service.update(updateUsuarioDto, undefined, '12345');
      expect(result).toEqual({ _id: 'someId', ...mockUsuario });
      expect(mockUsuarioModel.findOneAndUpdate).toHaveBeenCalledWith(
        { matricula: '12345' },
        updateUsuarioDto,
        { new: true }
      );
    });

    it('should throw a BadRequestException if no parameters are provided', async () => {
      const updateUsuarioDto: UpdateUsuarioDto = { ...mockUsuario };
      await expect(service.update(updateUsuarioDto)).rejects.toThrow(BadRequestException);
    });
    describe('remove', () => {
      it('should remove a user by id', async () => {
        jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(true);
        (mockUsuarioModel.findOneAndDelete().exec as jest.Mock).mockResolvedValueOnce(mockUsuario);
    
        const result = await service.remove(undefined, undefined, 'someId');
        expect(result).toEqual('Usuário removido com sucesso');
        expect(mockUsuarioModel.findOneAndDelete).toHaveBeenCalledWith({ _id: 'someId' });
      });
    
      it('should throw a NotFoundException if user is not found by id', async () => {
        jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(true);
        (mockUsuarioModel.findOneAndDelete().exec as jest.Mock).mockResolvedValueOnce(null);
    
        await expect(service.remove(undefined, undefined, 'someId')).rejects.toThrow(NotFoundException);
      });
    
      it('should remove a user by nomeCompleto', async () => {
        (mockUsuarioModel.findOneAndDelete().exec as jest.Mock).mockResolvedValueOnce(mockUsuario);
    
        const result = await service.remove('Test User');
        expect(result).toEqual('Usuário removido com sucesso');
        expect(mockUsuarioModel.findOneAndDelete).toHaveBeenCalledWith({ nomeCompleto: 'Test User' });
      });
    
      it('should remove a user by matricula', async () => {
        (mockUsuarioModel.findOneAndDelete().exec as jest.Mock).mockResolvedValueOnce(mockUsuario);
    
        const result = await service.remove(undefined, '12345');
        expect(result).toEqual('Usuário removido com sucesso');
        expect(mockUsuarioModel.findOneAndDelete).toHaveBeenCalledWith({ matricula: '12345' });
      });
    
      it('should throw a BadRequestException if no parameters are provided', async () => {
        await expect(service.remove()).rejects.toThrow(BadRequestException);
      });
    
      it('should throw an InternalServerErrorException for other errors', async () => {
        jest.spyOn(mongoose, 'isValidObjectId').mockReturnValue(true);
        (mockUsuarioModel.findOneAndDelete().exec as jest.Mock).mockRejectedValueOnce(new Error('Test Error'));
    
        await expect(service.remove(undefined, undefined, 'someId')).rejects.toThrow(InternalServerErrorException);
      });
    });    
  });
});