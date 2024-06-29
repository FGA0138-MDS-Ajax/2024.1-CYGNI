import { Test, TestingModule } from '@nestjs/testing';
import { AdministradoresService } from './administradores.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.services';
import { Administrador, AdministradorDocument } from './schemas/administrador.schema';
import { TokenDeConfirmacao, TokenDeConfirmacaoDocument } from './schemas/tokenDeConfirmacao.schema';
import * as bcrypt from 'bcrypt';
import { ForbiddenException, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { Types } from 'mongoose';

describe('AdministradoresService', () => {
  let service: AdministradoresService;
  let administradorModel: any;
  let tokenDeConfirmacaoModel: any;
  let jwtService: any;
  let emailService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdministradoresService,
        {
          provide: getModelToken(Administrador.name),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findById: jest.fn().mockImplementation((id) => {
              if (id === 'validId') {
                return { exec: jest.fn().mockResolvedValue({ name: 'Admin' }) };
              }
              return { exec: jest.fn().mockResolvedValue(null) };
            }),
            findByIdAndDelete: jest.fn(),
            findOneAndUpdate: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getModelToken(TokenDeConfirmacao.name),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            deleteOne: jest.fn(),
            find: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            enviaEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AdministradoresService>(AdministradoresService);
    administradorModel = module.get(getModelToken(Administrador.name));
    tokenDeConfirmacaoModel = module.get(getModelToken(TokenDeConfirmacao.name));
    jwtService = module.get<JwtService>(JwtService);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should hash the password and create a new administrator', async () => {
      const createAdministradorDto = { 
        senha: 'testPassword', 
        login: 'test', 
        email: 'test@example.com',
        nome: 'Test Admin',
        privilegios: true // Ajustando para booleano
      };
      const newAdmin = {
        ...createAdministradorDto,
        save: jest.fn().mockResolvedValue(true),
      };
  
      jest.spyOn(administradorModel, 'create').mockResolvedValue(newAdmin as any);
      console.log(createAdministradorDto)
      const result = await service.create(createAdministradorDto);
  
      expect(administradorModel.create).toHaveBeenCalledWith(createAdministradorDto);
    });
  });  

  describe('findAll', () => {
    it('should return an array of administrators', async () => {
      const administrators = [{ name: 'Admin1' }, { name: 'Admin2' }];
      administradorModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue(administrators) });

      const result = await service.findAll();

      expect(administradorModel.find).toHaveBeenCalled();
      expect(result).toBe(administrators);
    });
  });

  describe('login', () => {
    it('should return a JWT token for valid credentials', async () => {
      const loginDto = { login: 'test', senha: 'testPassword' };
      const admin = { login: 'test', senha: 'hashedPassword', privilegios: true };
      const token = 'jwtToken';

      administradorModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(admin) });
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as unknown as never); // Tipar como `never`
      jwtService.sign.mockReturnValue(token);

      const result = await service.login(loginDto);

      expect(administradorModel.findOne).toHaveBeenCalledWith({ login: loginDto.login });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.senha, admin.senha);
      expect(jwtService.sign).toHaveBeenCalledWith(
        { login: admin.login, privilegios: admin.privilegios },
        { secret: process.env.JWT_SECRET }
      );
      expect(result).toBe(token);
    });

    it('should throw ForbiddenException for invalid credentials', async () => {
      const loginDto = { login: 'test', senha: 'wrongPassword' };

      administradorModel.findOne.mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      await expect(service.login(loginDto)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('findOne', () => {
    it('should return an administrator for a valid ID', async () => {
      const id = new Types.ObjectId().toString(); // Cria um ID válido
      const admin = { name: 'Admin' };
  
      administradorModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(admin)
      });
  
      const result = await service.findOne(id);
  
      expect(administradorModel.findById).toHaveBeenCalledWith(id);
      expect(result).toBe(admin);
    });
  
    it('should throw BadRequestException for an invalid ID', async () => {
      const id = 'invalidId';
  
      await expect(service.findOne(id)).rejects.toThrow(BadRequestException);
    });
  });
});
