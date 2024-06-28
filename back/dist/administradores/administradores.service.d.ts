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
import { JwtService } from '@nestjs/jwt';
import { Model, Types } from 'mongoose';
import { EmailService } from 'src/email/email.services';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { LoginDTO } from './dto/login.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import { Administrador } from './schemas/administrador.schema';
import { TokenDeConfirmacao, TokenDeConfirmacaoDocument } from './schemas/tokenDeConfirmacao.schema';
import { RedefineSenhaDto } from './dto/troca-senha.dto';
export declare class AdministradoresService {
    private TokenDeConfirmacaoModel;
    private administradorModel;
    private jwtService;
    private readonly emailService;
    constructor(TokenDeConfirmacaoModel: Model<TokenDeConfirmacaoDocument>, administradorModel: Model<Administrador>, jwtService: JwtService, emailService: EmailService);
    create(CreateAdministradorDto: CreateAdministradorDto): Promise<import("mongoose").Document<unknown, {}, Administrador> & Administrador & {
        _id: Types.ObjectId;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Administrador> & Administrador & {
        _id: Types.ObjectId;
    })[]>;
    login({ login, senha }: LoginDTO): Promise<string>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Administrador> & Administrador & {
        _id: Types.ObjectId;
    }>;
    update(id: string, updateAdministradorDto: UpdateAdministradorDto): Promise<import("mongoose").Document<unknown, {}, Administrador> & Administrador & {
        _id: Types.ObjectId;
    }>;
    remove(id: string): Promise<string>;
    enviaTokenRedefinirSenha(email: string): Promise<void>;
    verificaToken(email: string, token: string): Promise<boolean>;
    redefineSenha({ email, novaSenha, novaSenhaConfirmacao, token }: RedefineSenhaDto): Promise<string>;
    findAllTokens(): Promise<(import("mongoose").Document<unknown, {}, TokenDeConfirmacaoDocument> & TokenDeConfirmacao & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>)[]>;
}
