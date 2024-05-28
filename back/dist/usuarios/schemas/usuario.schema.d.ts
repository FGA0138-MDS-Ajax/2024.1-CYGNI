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
import { Documentacao } from './documentacao.schema';
import { FichaGerencial } from './fichaGerencial.schema';
import { Endereco } from './endereco.schema';
export type UsuarioDocument = HydratedDocument<Usuario>;
export declare class Usuario {
    id: number;
    nomeCompleto: string;
    nomeDaMae: string;
    nomeDoPai: string;
    sexo: string;
    dataDeNaschimento: number;
    tipoSanguineo: string;
    estadoCivil: string;
    email: string;
    telefone: string;
    privilegios: number;
    endereco: Endereco;
    documentacao: Documentacao;
    fichaGerencial: FichaGerencial;
}
export declare const UsuarioModel: mongoose.Schema<Usuario, mongoose.Model<Usuario, any, any, any, mongoose.Document<unknown, any, Usuario> & Usuario & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Usuario, mongoose.Document<unknown, {}, mongoose.FlatRecord<Usuario>> & mongoose.FlatRecord<Usuario> & {
    _id: mongoose.Types.ObjectId;
}>;
