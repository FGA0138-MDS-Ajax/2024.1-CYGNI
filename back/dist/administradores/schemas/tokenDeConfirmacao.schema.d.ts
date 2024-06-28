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
import { Document } from 'mongoose';
export type TokenDeConfirmacaoDocument = TokenDeConfirmacao & Document;
export declare class TokenDeConfirmacao {
    email: string;
    token: string;
    valido: boolean;
    createdAt: Date;
}
export declare const TokenDeConfirmacaoSchema: import("mongoose").Schema<TokenDeConfirmacao, import("mongoose").Model<TokenDeConfirmacao, any, any, any, Document<unknown, any, TokenDeConfirmacao> & TokenDeConfirmacao & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TokenDeConfirmacao, Document<unknown, {}, import("mongoose").FlatRecord<TokenDeConfirmacao>> & import("mongoose").FlatRecord<TokenDeConfirmacao> & {
    _id: import("mongoose").Types.ObjectId;
}>;
