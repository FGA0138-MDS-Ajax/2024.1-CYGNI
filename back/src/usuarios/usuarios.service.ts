import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './schemas/usuario.schema';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) {}
  
  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  async findAll() {
    return await this.usuarioModel.find().exec();
  }

  async findOne(id: number) {
    try{
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid ID!');
      }
      return await this.usuarioModel.findById(id).exec();
    } catch (error) {
      throw new InternalServerErrorException('Error finding user', error.message);
    }
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
