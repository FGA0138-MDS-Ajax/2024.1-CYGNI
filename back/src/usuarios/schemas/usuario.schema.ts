import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Documento } from '../../documento/schema/documentacao.schema';
import { FichaGerencial } from '../../ficha-gerencial/schema/fichaGerencial.schema';
import { Endereco } from '../../endereco/schema/endereco.schema';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
    @Prop({required: false})
    id: number

    @Prop({required: true})
    nomeCompleto: string

    @Prop({required: false})
    nomeDaMae: string

    @Prop({required: false})
    nomeDoPai: string

    @Prop({required: false})
    sexo: string

    @Prop({required: false})
    dataDeNascimento: number

    @Prop({required: false})
    tipoSanguineo: string

    @Prop({required: false})
    estadoCivil: string

    @Prop({required: false})
    email: string

    @Prop({required: false})
    telefone: string

    @Prop({required: false})
    senha: string

    @Prop()
    privilegios: number
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Endereco', required: false})
    endereco: Endereco

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Documento', required: false})
    documento: Documento

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'FichaGerencial', required: false})
    fichaGerencial: FichaGerencial

    
}

export const UsuarioModel = SchemaFactory.createForClass(Usuario)