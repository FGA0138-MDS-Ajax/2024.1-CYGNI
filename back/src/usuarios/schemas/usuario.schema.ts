import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Documentacao } from './documentacao.schema';
import { FichaGerencial } from './fichaGerencial.schema';
import { Endereco } from './endereco.schema';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
    @Prop({required: true})
    id: number

    @Prop({required: true})
    nomeCompleto: string

    @Prop({required: true})
    nomeDaMae: string

    @Prop({required: false})
    nomeDoPai: string

    @Prop({required: true})
    sexo: string

    @Prop({required: true})
    dataDeNascimento: number

    @Prop({required: true})
    tipoSanguineo: string

    @Prop({required: true})
    estadoCivil: string

    @Prop({required: true})
    email: string

    @Prop({required: true})
    telefone: string

    @Prop()
    privilegios: number
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Endereco', required: false})
    endereco: Endereco

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Documentacao', required: false})
    documentacao: Documentacao

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'FichaGerencial', required: false})
    fichaGerencial: FichaGerencial

    
}

export const UsuarioModel = SchemaFactory.createForClass(Usuario)