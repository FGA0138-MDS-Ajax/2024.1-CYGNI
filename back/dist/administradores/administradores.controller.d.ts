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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { AdministradoresService } from './administradores.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import { LoginDTO } from './dto/login.dto';
import { VerificaTokenDto } from 'src/administradores/dto/verifica-token.dto';
import { RedefineSenhaDto } from './dto/troca-senha.dto';
import { EnviaEmailDTO } from './dto/envia-email.dto';
export declare class AdministradoresController {
    private readonly administradoresService;
    constructor(administradoresService: AdministradoresService);
    create(createAdministradorDto: CreateAdministradorDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/administrador.schema").Administrador> & import("./schemas/administrador.schema").Administrador & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    login(loginDTO: LoginDTO): Promise<string>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/administrador.schema").Administrador> & import("./schemas/administrador.schema").Administrador & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/administrador.schema").Administrador> & import("./schemas/administrador.schema").Administrador & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateAdministradorDto: UpdateAdministradorDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/administrador.schema").Administrador> & import("./schemas/administrador.schema").Administrador & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<string>;
    enviaRedefinicaoDeSenha(enviaEmailDTO: EnviaEmailDTO): Promise<void>;
    verificaToken(verificaTokenDto: VerificaTokenDto): Promise<boolean>;
    trocaSenha(redefineSenhaDto: RedefineSenhaDto): Promise<string>;
    tokens(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/tokenDeConfirmacao.schema").TokenDeConfirmacaoDocument> & import("./schemas/tokenDeConfirmacao.schema").TokenDeConfirmacao & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>)[]>;
}
