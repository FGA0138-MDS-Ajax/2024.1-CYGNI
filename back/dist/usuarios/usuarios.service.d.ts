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
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Model } from 'mongoose';
import { Usuario } from './schemas/usuario.schema';
export declare class UsuariosService {
    private usuarioModel;
    constructor(usuarioModel: Model<Usuario>);
    create(createUsuarioDto: CreateUsuarioDto): Promise<import("mongoose").Document<unknown, {}, Usuario> & Usuario & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Usuario> & Usuario & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findByNameOrMatriculaOrId(nomeCompleto?: string, matricula?: string, id?: string): Promise<(import("mongoose").Document<unknown, {}, Usuario> & Usuario & {
        _id: import("mongoose").Types.ObjectId;
    }) | (import("mongoose").Document<unknown, {}, Usuario> & Usuario & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    update(updateUsuarioDto: UpdateUsuarioDto, nomeCompleto?: string, matricula?: string, id?: string): Promise<import("mongoose").Document<unknown, {}, Usuario> & Usuario & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(nomeCompleto?: string, matricula?: string, id?: string): Promise<string>;
}
