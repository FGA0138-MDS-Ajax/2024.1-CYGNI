import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Administrador } from './schemas/administrador.schema';
import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class AdministradoresService {
  constructor(@InjectModel(Administrador.name) private administradorModel: Model<Administrador>) {}
  
  async create(CreateAdministradorDto: CreateAdministradorDto) {
    const newAdmin = new this.administradorModel(CreateAdministradorDto);
    return await newAdmin.save();
  }

  async findAll() {
    return await this.administradorModel.find().exec();
  }

  async findOne(id: string) {
    try{
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('ID inválido');
      }
      return await this.administradorModel.findById(id).exec();
    } catch (error) {
      throw new InternalServerErrorException('Falha ao encontrar administrador', error.message);
    }
  }

  async update(id: string, updateAdministradorDto: UpdateAdministradorDto) {

    try {


      const atualizaAdministrador = await this.administradorModel.findOneAndUpdate({ _id :id }, updateAdministradorDto, { new: true}).exec();

      if(!atualizaAdministrador) {
        throw new NotFoundException('Administrador não encontrado'); 
      }

      return atualizaAdministrador;

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
}
