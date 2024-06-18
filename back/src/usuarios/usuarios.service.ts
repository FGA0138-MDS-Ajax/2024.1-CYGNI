import { Injectable, InternalServerErrorException, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './schemas/usuario.schema';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,

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

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {

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
}
