import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DocumentacaoDocument = HydratedDocument<Documentacao>;

@Schema()
export class Documentacao {
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