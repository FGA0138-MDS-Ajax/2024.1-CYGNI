import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<Usuario>;

@Schema()
export class Usuario {
    @Prop({required: false, default: null})
    id: number | null

    // Dados pessoais gerais
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

    // Documentação
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
    
    // Endereço
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

    // Ficha gerencial
    @Prop({required: false, default: null})
    classificacao: string | null
    
    @Prop({required: false, default: null})
    funcao: string | null

    @Prop({required: false, default: null}) //tipo de escala
    escala: string | null

    @Prop({required: false, default: null,type: Date}) //dia inicial da escala
    escalaInicio: Date | null

    @Prop({required: false, default: null})  //n precisa agora
    horarioEscala: string | null

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

    // Afastamento

    @Prop({ required: false, default: () => [] })  //lista de motivos
    motivo: (string | null)[];

    @Prop({ required: false, default: () => [] })  //não precisa
    anoReferencia: (number | null)[];

    @Prop({ required: false, default: () => [], type: [Date] })  //inicio afastamento
    dataInicio: (Date | null)[];

    @Prop({ required: false, default: () => [], type: [Date] })  //final do afastamento
    dataTermino: (Date | null)[];
    
    @Prop({required: false, default: () => []})
    observacoes: (string | null)[];

    //ultimo adm a editar esta ficha
    @Prop({required: false, default: null})
    ultimoEditor: string | null
}

export const UsuarioModel = SchemaFactory.createForClass(Usuario)