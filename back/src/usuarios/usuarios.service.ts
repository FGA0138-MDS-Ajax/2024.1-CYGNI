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
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    const newUser = await this.usuarioModel.create(createUsuarioDto);
    return newUser;
  }

  async findAll(): Promise<Usuario[]> {
    try {
      return await this.usuarioModel.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Falha ao buscar usuários', error.message);
    }
  }

  async findByNameOrMatriculaOrId(nomeCompleto?: string, matricula?: string, id?: string) {
    if (!id && !nomeCompleto && !matricula) {
      throw new BadRequestException('É necessário fornecer nomeCompleto, matricula ou id');
    }

    try {
      if (id && isValidObjectId(id)) {
        return await this.usuarioModel.findById(id).exec();
      } else if (nomeCompleto) {
        return await this.usuarioModel.find({ nomeCompleto: { $regex: nomeCompleto, $options: 'i' } }).exec();
      } else if (matricula) {
        return await this.usuarioModel.findOne({ matricula }).exec();
      }
    } catch (error) {
      throw new InternalServerErrorException('Falha ao encontrar usuário', error.message);
    }
  }

  async update(updateUsuarioDto: UpdateUsuarioDto, nomeCompleto?: string, matricula?: string, id?: string) {
    if (!nomeCompleto && !matricula && !id) {
      throw new BadRequestException('É necessário fornecer nomeCompleto, matricula ou id');
    }
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

      // Criação do objeto de atualização
      const { motivo, anoReferencia, dataInicio, dataTermino, observacoes, ...restUpdateDto } = updateUsuarioDto;

      // Converter para arrays se não forem
      const motivoArray = Array.isArray(motivo) ? motivo : [motivo];
      const observacoesArray = Array.isArray(observacoes) ? observacoes : [observacoes];
      const anoReferenciaArray = Array.isArray(anoReferencia) ? anoReferencia : [anoReferencia];
      const dataInicioArray = Array.isArray(dataInicio) ? dataInicio.map(date => new Date(date)) : [new Date(dataInicio)];
      const dataTerminoArray = Array.isArray(dataTermino) ? dataTermino.map(date => new Date(date)) : [new Date(dataTermino)];

      // Criação do objeto de atualização
      let updateQuery: any = { ...restUpdateDto };
      let arrayUpdate: any = {};

      if (motivoArray.length > 0) {
        arrayUpdate.motivo = { $each: motivoArray };
      }
      if (observacoesArray.length > 0)  {
        arrayUpdate.observacoes  = { $each: observacoesArray };
      }
      if (anoReferenciaArray.length > 0) {
        arrayUpdate.anoReferencia = { $each: anoReferenciaArray.map(Number) };
      }
      if (dataInicioArray.length > 0) {
        arrayUpdate.dataInicio = { $each: dataInicioArray };
      }
      if (dataTerminoArray.length > 0) {
        arrayUpdate.dataTermino = { $each: dataTerminoArray };
      }

      if (Object.keys(arrayUpdate).length > 0) {
        updateQuery = {
          ...updateQuery,
          $push: arrayUpdate
        };
      }


      const atualizaUsuario = await this.usuarioModel.findOneAndUpdate(
        filter,
        updateQuery,
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
    if (!nomeCompleto && !matricula && !id) {
      throw new BadRequestException('É necessário fornecer nomeCompleto, matricula ou id');
    }
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
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Falha ao remover usuário', error.message);
    }
  }
}
