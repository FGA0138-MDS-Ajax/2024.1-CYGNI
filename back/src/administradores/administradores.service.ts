import { BadRequestException, ForbiddenException, Get, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as crypto from "crypto";
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { EmailService } from '../email/email.services';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { LoginDTO } from './dto/login.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import { Administrador } from '../administradores/schemas/administrador.schema'
import { TokenDeConfirmacao, TokenDeConfirmacaoDocument } from './schemas/tokenDeConfirmacao.schema';
import { RedefineSenhaDto } from './dto/troca-senha.dto';

@Injectable()
export class AdministradoresService {
  constructor(
    @InjectModel(Administrador.name) private administradorModel: Model<Administrador>,
    @InjectModel(TokenDeConfirmacao.name) private TokenDeConfirmacaoModel: Model<TokenDeConfirmacaoDocument>,
    private jwtService: JwtService,
    private readonly emailService: EmailService
  ) { }

  async create(CreateAdministradorDto: CreateAdministradorDto) {
    const usuarioExisteEmail = await this.administradorModel.findOne({ email: CreateAdministradorDto.email }).exec();
    if (usuarioExisteEmail) { //verificação de email antes de criar usuario
      throw new BadRequestException('Já existe um usuário com este email');
    }
    const usuarioExisteLogin = await this.administradorModel.findOne({login:CreateAdministradorDto.email}).exec();
    if (usuarioExisteLogin) { //verificação de login antes de criar usuario
      throw new BadRequestException('Já existe um usuário com este login');
    }
    CreateAdministradorDto.senha = await bcrypt.hash(CreateAdministradorDto.senha, parseInt(process.env.SALT)); // hash da senha com SALT do .env
    //Logger.log(CreateAdministradorDto);
    const newAdmin = await this.administradorModel.create(CreateAdministradorDto);
    return  newAdmin;
  }

  async findAll() {
    return await this.administradorModel.find().exec();
  }

  async login({ login, senha }: LoginDTO) {
    try {
      const administrador = await this.administradorModel.findOne({ login }).exec(); //procura pelo login especifico no banco
      if (!administrador) throw new ForbiddenException('usuário não existe ou senha inválida');
      if (!await bcrypt.compare(senha,administrador.senha)) throw new ForbiddenException('usuário não existe ou senha inválida'); // compara a senha hash
      const token = this.jwtService.sign( //envia um token jwt
        {
          login: administrador.login,
          privilegios: administrador.privilegios //devolve privilegios e login no token para uso futuro
        },
        {
          secret: process.env.JWT_SECRET //utiliza secret do .env
        }
      )

      return token;
    } catch (error) {
      Logger.log(error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('ID inválido');
      }
      const admin = await this.administradorModel.findById(id).exec();
      if (!admin) {
        throw new NotFoundException('Administrador não encontrado');
      }
      return admin;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Falha ao encontrar administrador', error.message);
    }
  }
  



  async update(id: string, updateAdministradorDto: UpdateAdministradorDto) {

    try {
      const atualizaAdministrador = await this.administradorModel.findOneAndUpdate({ _id: id }, updateAdministradorDto, { new: true }).exec();

      if (!atualizaAdministrador) {
        throw new NotFoundException('Administrador não encontrado');
      }

      return atualizaAdministrador;

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

    }
  }

  async remove(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('ID inválido');
      }
      const result = await this.administradorModel.findByIdAndDelete(id).exec();
      if (result) {
        return 'Administrador removido com sucesso';
      } else {
        throw new NotFoundException('Administrador não encontrado');
      }
    } catch (error) {
      throw new InternalServerErrorException('Falha ao remover administrador', error.message);
    }
  }

  async enviaTokenRedefinirSenha(email: string): Promise<void> {
    try {
      //Logger.log("início da função");
      const usuario = await this.administradorModel.findOne({ email });
      if (!usuario) {
        throw new NotFoundException("Usuario nao encontrado");
      }
      //Logger.log(usuario, email);
      const token = crypto.randomBytes(3).toString('hex');
      //Logger.log(token);
      await new this.TokenDeConfirmacaoModel({
        email: email,
        token
      }).save();
      Logger.log("token salvo");
      const text = `Seu código de redefinição de senha é: ${token}`;
      const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <p>Olá,</p>
        <p>Você solicitou a redefinição de senha. Use o código abaixo para redefinir sua senha:</p>
        <h2 style="color: blue; background-color: #f0f0f0; padding: 10px; display: inline-block;">${token}</h2>
        <p>Se você não solicitou a redefinição de senha, por favor, ignore este email.</p>
        <p>Obrigado,</p>
        <p><strong>Equipe AGIS</strong></p>
        <hr>
        <p style="font-size: 0.9em; color: #888;">Este é um email automático, por favor, não responda.</p>
      </div>
    `;

      await this.emailService.enviaEmail(usuario.email, "Redefinição de senha AGIS", text, html);

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
  }
  async verificaToken(email: string, token: string): Promise<boolean> {
    try {
      const confirmaToken = await this.TokenDeConfirmacaoModel.findOne({ email, token });
      if (!confirmaToken) {
        throw new NotFoundException('Token Invalido');
      }

      return true
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }

  }
  async redefineSenha({email, novaSenha, novaSenhaConfirmacao, token}: RedefineSenhaDto) {
    try {
      //Logger.log(novaSenha);
      if (novaSenha !== novaSenhaConfirmacao) throw new BadRequestException;

      const tokenValidado = await this.verificaToken(email, token);
      //Logger.log("token validado:" + tokenValidado);
      if (!tokenValidado) {
        throw new NotFoundException('Token inválido ou expirado');
      }
      const usuario = await this.administradorModel.findOne({ email });
      if (!usuario) {
        Logger.log("não encontrou usuario", usuario);
        throw new NotFoundException('Usuário não encontrado');
      }
      usuario.senha = await bcrypt.hash(novaSenha, parseInt(process.env.SALT));
      //Logger.log(usuario);
      await usuario.save();
      await this.TokenDeConfirmacaoModel.deleteOne({ email, token });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
  }


  async findAllTokens(){
    return this.TokenDeConfirmacaoModel.find().exec();
  }
}
