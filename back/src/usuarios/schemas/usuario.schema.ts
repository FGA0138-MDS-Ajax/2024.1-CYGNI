import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
    @Prop({required: false, default: null})
    id: number | null

    @Prop({required: true})
    nomeCompleto: string
    
    @Prop({required: true})
    matricula: string

    @Prop({required: false, default: null})
    nomeGuerra: string | null

    @Prop({required: false, default: null})
    nomeMae: string | null

    @Prop({required: false, default: null})
    nomePai: string | null

    @Prop({required: false, default: null})
    sexo: string | null

    @Prop({required: false, default: null, type: Date})
    dataDeNascimento: Date | null

    @Prop({required: false, default: null})
    tipoSanguineo: string | null

    @Prop({required: false, default: null})
    estadoCivil: string | null

    @Prop({required: false, default: null})
    email: string | null

    @Prop({required: false, default: null})
    telefone: string | null

    @Prop({required: false, default: null})
    postGrad : string | null

    @Prop({required: false, default: null})
    escolaridade: string | null

    //ficha gerencial
    @Prop({required: false, default: null})
    classificacao: string | null
    
    @Prop({required: false, default: null})
    funcao: string | null

    @Prop({required: false, default: null})
    escala: string | null

    @Prop({required: false, default: null})
    horarioEscala: number | null

    @Prop({required: false, default: null})
    lotacao: string | null

    @Prop({required: false, default: null})
    comportamento: string | null

    @Prop({required: false, default: null})
    porteArma: boolean | null

    @Prop({required: false, default: null, type: Date})
    admissao: Date | null

    @Prop({required: false, default: null, type: Date})
    apresentacao: Date | null

    @Prop({required: false, default: null, type: Date})
    validadeBienal: Date | null

    @Prop({required: false, default: null, type: Date})
    validadeTAF: Date | null


    //campos relacionados a endereço
    @Prop({required: false, default: null})
    cep: string | null

    @Prop({required: false,default:null})
    bairro: string | null

    @Prop({required: false,default:null})
    cidade: string | null

    @Prop({required: false,default:null})
    uf: string | null

    @Prop({required: false,default:null})
    logradouro: string | null

    //documentação
    @Prop({required: false, default: null})
    rg: string | null

    @Prop({required: false, default: null})
    cpf: string | null

    @Prop({required: false, default: null})
    matSiape: string | null

    @Prop({required: false, default: null})
    cnhProntuario: string | null
    
    @Prop({required: false, default: null})
    cnhCategoria: string | null

    @Prop({required: false, default: null, type: Date})
    cnhValidade: Date | null

}

export const UsuarioModel = SchemaFactory.createForClass(Usuario)