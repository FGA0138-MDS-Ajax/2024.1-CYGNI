import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Administrador } from './schemas/administrador.schema';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class AdministradorService {
  constructor(@InjectModel(Administrador.name) private usuarioModel: Model<Administrador>) {}
  
  async create(createUsuarioDto: CreateAdministradorDto) {
    const newUser = new this.usuarioModel(createUsuarioDto);
    return await newUser.save();
  }

  async findAll() {
    return await this.usuarioModel.find().exec();
  }

  async findOne(id: number) {
    try{
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('ID inválido');
      }
      return await this.usuarioModel.findById(id).exec();
    } catch (error) {
      throw new InternalServerErrorException('Falha ao encontrar administrador', error.message);
    }
  }

  async update(id: number, updateUsuarioDto: UpdateAdministradorDto) {

    try {

      const atualizaUsuario = await this.usuarioModel.findOneAndUpdate({ id }, updateUsuarioDto, { new: true}).exec();

      if(!atualizaUsuario) {
        throw new NotFoundException('Administrador não encontrado'); 
      }

      return atualizaUsuario;

    } catch (error) {
      if (error instanceof NotFoundException){
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
        return 'Administrador removido com sucesso';
      } else {
        throw new NotFoundException('Administrador não encontrado');
      }
    } catch (error) {
      throw new InternalServerErrorException('Falha ao remover administrador', error.message);
    }
  }
}
