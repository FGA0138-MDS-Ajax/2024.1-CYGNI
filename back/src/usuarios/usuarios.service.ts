import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
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
    const usuarioExistente = await this.usuarioModel.findOne({ matricula: createUsuarioDto.matricula }).exec();
    Logger.log(usuarioExistente);
    if (usuarioExistente) {
      throw new BadRequestException('Já existe um usuário com esta matrícula.');
    }
    const newUser = await this.usuarioModel.create(createUsuarioDto);
    Logger.log(newUser);
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
    if (!id && !nomeCompleto && !matricula) { //verificação se o parametro existe
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

        // Preparar a parte do arrayUpdate apenas se os respectivos campos estiverem presentes no DTO
        let arrayUpdate: any = {};

        if (motivo !== undefined) {
            const motivoArray = Array.isArray(motivo) ? motivo : [motivo];
            arrayUpdate.motivo = { $each: motivoArray };
        }

        if (observacoes !== undefined) {
            const observacoesArray = Array.isArray(observacoes) ? observacoes : [observacoes];
            arrayUpdate.observacoes = { $each: observacoesArray };
        }

        if (anoReferencia !== undefined) {
            const anoReferenciaArray = Array.isArray(anoReferencia) ? anoReferencia : [anoReferencia];
            arrayUpdate.anoReferencia = { $each: anoReferenciaArray.map(Number) };
        }

        if (dataInicio !== undefined) {
            const dataInicioArray = Array.isArray(dataInicio) ? dataInicio.map(date => new Date(date)) : [new Date(dataInicio)];
            const validDataInicioArray = dataInicioArray.map(date => new Date(date)).filter(date => !isNaN(date.getTime()));

            if (validDataInicioArray.length !== dataInicioArray.length) {
                throw new BadRequestException('Uma ou mais datas de início são inválidas');
            }
            arrayUpdate.dataInicio = { $each: validDataInicioArray };
        }

        if (dataTermino !== undefined) {
            const dataTerminoArray = Array.isArray(dataTermino) ? dataTermino.map(date => new Date(date)) : [new Date(dataTermino)];
            const validDataTerminoArray = dataTerminoArray.map(date => new Date(date)).filter(date => !isNaN(date.getTime()));

            if (validDataTerminoArray.length !== dataTerminoArray.length) {
                throw new BadRequestException('Uma ou mais datas de término são inválidas');
            }
            arrayUpdate.dataTermino = { $each: validDataTerminoArray };
        }

        let updateQuery: any = { ...restUpdateDto };
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
      throw new BadRequestException('É necessário fornecer nomeCompleto, matricula ou id'); //mesma logica do create e findby
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
