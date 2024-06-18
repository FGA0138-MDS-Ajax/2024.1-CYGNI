import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './schemas/usuario.schema';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const newUser = new this.usuarioModel(createUsuarioDto);
    return await newUser.save();
  }

  async findAll() {
    return await this.usuarioModel.find().exec();
  }

  async findByNameOrMatriculaOrId(nomeCompleto?: string, matricula?: string, id?: string) {
    try {
      if (id && isValidObjectId(id)) {
        return await this.usuarioModel.findById(id).exec();
      } else if (nomeCompleto) {
        return await this.usuarioModel.find({ nomeCompleto: { $regex: nomeCompleto, $options: 'i' } }).exec();
      } else if (matricula) {
        return await this.usuarioModel.findOne({ matricula }).exec();
      } else {
        throw new BadRequestException('É necessário fornecer nomeCompleto, matricula ou id');
      }
    } catch (error) {
      throw new InternalServerErrorException('Falha ao encontrar usuário', error.message);
    }
  }

  async update(updateUsuarioDto: UpdateUsuarioDto, nomeCompleto?: string, matricula?: string, id?: string) {
    try {
      let filter = {};
      if (id && isValidObjectId(id)) {
        filter = { _id: id };
      } else if (nomeCompleto) {
        filter = { nomeCompleto };
      } else if (matricula) {
        filter = { matricula };
      } else {
        throw new BadRequestException('É necessário fornecer nomeCompleto, matricula ou id');
      }

      const atualizaUsuario = await this.usuarioModel.findOneAndUpdate(
        filter, 
        updateUsuarioDto, 
        { new: true }
      ).exec();

      if (!atualizaUsuario) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return atualizaUsuario;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Falha ao atualizar usuário', error.message);
    }
  }

  async remove(nomeCompleto?: string, matricula?: string, id?: string) {
    try {
      let filter = {};
      if (id && isValidObjectId(id)) {
        filter = { _id: id };
      } else if (nomeCompleto) {
        filter = { nomeCompleto };
      } else if (matricula) {
        filter = { matricula };
      } else {
        throw new BadRequestException('É necessário fornecer nomeCompleto, matricula ou id');
      }

      const result = await this.usuarioModel.findOneAndDelete(filter).exec();
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
