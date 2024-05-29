import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './schemas/usuario.schema';

@Injectable()
export class UsuariosService {
  constructor(@InjectModel(Usuario.name) private usuarioModel: Model<Usuario>) {}
  
  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {

    try {

      const atualizaUsuario = await this.usuarioModel.findOneAndUpdate({ id }, updateUsuarioDto, { new: true}).exec();

      if(!atualizaUsuario) {
        throw new NotFoundException('Usuario não encontrado'); 
      }

      return atualizaUsuario;

    } catch (error) {
      if (error instanceof NotFoundException){
        throw error;
      }

    }
    
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
