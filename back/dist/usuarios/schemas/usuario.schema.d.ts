/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import mongoose, { HydratedDocument } from 'mongoose';
export type UsuarioDocument = HydratedDocument<Usuario>;
export declare class Usuario {
    id: number | null;
    nomeCompleto: string;
    matricula: string;
    nomeGuerra: string | null;
    nomeMae: string | null;
    nomePai: string | null;
    sexo: string | null;
    dataDeNascimento: Date | null;
    tipoSanguineo: string | null;
    estadoCivil: string | null;
    email: string | null;
    telefone: string | null;
    postGrad: string | null;
    escolaridade: string | null;
    rg: string | null;
    cpf: string | null;
    matSiape: string | null;
    cnhProntuario: string | null;
    cnhCategoria: string | null;
    cnhValidade: Date | null;
    cep: string | null;
    bairro: string | null;
    cidade: string | null;
    uf: string | null;
    logradouro: string | null;
    classificacao: string | null;
    funcao: string | null;
    escala: string | null;
    escalaInicio: Date | null;
    horarioEscala: string | null;
    lotacao: string | null;
    comportamento: string | null;
    porteArma: boolean | null;
    admissao: Date | null;
    apresentacao: Date | null;
    validadeBienal: Date | null;
    validadeTAF: Date | null;
    motivo: (string | null)[];
    anoReferencia: (number | null)[];
    dataInicio: (Date | null)[];
    dataTermino: (Date | null)[];
    dias: (number | null)[];
    observacoes: string | null;
    ultimoEditor: string | null;
}
export declare const UsuarioModel: mongoose.Schema<Usuario, mongoose.Model<Usuario, any, any, any, mongoose.Document<unknown, any, Usuario> & Usuario & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Usuario, mongoose.Document<unknown, {}, mongoose.FlatRecord<Usuario>> & mongoose.FlatRecord<Usuario> & {
    _id: mongoose.Types.ObjectId;
}>;
