import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DocumentacaoDocument = HydratedDocument<Documento>;

@Schema()
export class Documento {
    @Prop()
    id: number

    @Prop()
    RG: string

    @Prop()
    matSiape: string

    @Prop()
    CNHProntuario: string 
    
    @Prop()
    CNHCategoria: string

    @Prop()
    CNHValidade: number
}

export const DocumentoSchema = SchemaFactory.createForClass(Documento)