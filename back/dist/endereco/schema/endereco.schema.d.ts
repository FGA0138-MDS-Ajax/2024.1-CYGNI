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
import { HydratedDocument } from "mongoose";
export type enderecoDocument = HydratedDocument<Endereco>;
export declare class Endereco {
    id: number;
    CEP: string;
    quadra: string;
    conjunto: string;
    casa: string;
    bairro: string;
    cidade: string;
    UF: string;
}
export declare const EnderecoSchema: import("mongoose").Schema<Endereco, import("mongoose").Model<Endereco, any, any, any, import("mongoose").Document<unknown, any, Endereco> & Endereco & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Endereco, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Endereco>> & import("mongoose").FlatRecord<Endereco> & {
    _id: import("mongoose").Types.ObjectId;
}>;
