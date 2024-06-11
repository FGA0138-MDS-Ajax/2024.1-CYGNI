import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type enderecoDocument = HydratedDocument<Endereco>;

@Schema()
export class Endereco {
    @Prop({required: true})
    id: number

    @Prop({required: true})
    CEP: string

    @Prop({required: false})
    quadra: string

    @Prop({required: false})
    conjunto: string

    @Prop({required: false})
    casa: string

    @Prop({required: true})
    bairro: string

    @Prop({required: true})
    cidade: string

    @Prop({required: true})
    UF: string
}

export const EnderecoSchema = SchemaFactory.createForClass(Endereco)