import { Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './schemas/usuario.schema';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { TokenDeConfirmacao, TokenDeConfirmacaoDocument } from './schemas/tokenDeConfirmacao.schema';
import { EmailService } from 'src/email/email.services';
import * as crypto from 'crypto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
    @InjectModel(TokenDeConfirmacao.name) private TokenDeConfirmacaoModel: Model<TokenDeConfirmacaoDocument>,
    private readonly emailService: EmailService
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const newUser = new this.usuarioModel(createUsuarioDto);
    return await newUser.save();
  }

  async findAll() {
    return await this.usuarioModel.find().exec();
  }

  async findByName(nomeCompleto: string) {
    try {
      return await this.usuarioModel.find({ nomeCompleto: { $regex: nomeCompleto, $options: 'i' } }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Falha ao encontrar usuário', error.message);
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {

    try {

      const atualizaUsuario = await this.usuarioModel.findOneAndUpdate({ id }, updateUsuarioDto, { new: true }).exec();

      if (!atualizaUsuario) {
        throw new NotFoundException('Usuario não encontrado');
      }

      return atualizaUsuario;

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
      const result = await this.usuarioModel.findByIdAndDelete(id).exec();
      if (result) {
        return 'Usuário removido com sucesso';
      } else {
        throw new NotFoundException('Usuário não encontrado');
      }
    } catch (error) {
      throw new InternalServerErrorException('Falha ao remover usuário', error.message);
    }
  }
  async enviaTokenRedefinirSenha(email: string): Promise<void> {
    try {
      const usuario = await this.usuarioModel.findOne({ email });
      if (!usuario) {
        throw new NotFoundException("Usuario nao encontrado");
      }
      const token = crypto.randomBytes(3).toString('hex');
      await new this.TokenDeConfirmacaoModel({
        email: usuario.email,
        token
      }).save()
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
  async redefineSenha(email: string, novaSenha: string, novaSenhaConfirmacao: string, token: string) {
    try {
      const tokenValidado = await this.verificaToken(email, token);
      if (!tokenValidado) {
        throw new NotFoundException('Token inválido ou expirado');
      }
      const usuario = await this.usuarioModel.findOne({ email });
      if (!usuario) {
        throw new NotFoundException('Usuário não encontrado');
      }
      usuario.senha = novaSenha;
      await usuario.save();
      await this.TokenDeConfirmacaoModel.deleteOne({ email, token });
      return 'Senha Alterada'
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
    }
  }
}
