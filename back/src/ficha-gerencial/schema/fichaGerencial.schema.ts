import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type fichaGerencialDocument = HydratedDocument<FichaGerencial>;

@Schema()
export class FichaGerencial {
    @Prop()
    id: number

    @Prop()
    classificacao: string
    
    @Prop()
    funcao: string

    @Prop()
    escala: string

    @Prop()
    horarioEscala: number

    @Prop()
    lotacao: string

    @Prop()
    comportamento: string

    @Prop()
    porteDeArma: boolean

    @Prop()
    admissao: number

    @Prop()
    apresentacao: string

    @Prop()
    validadeBienal: number 

    @Prop()
    validadeTAF: number
}

export const FichaGerencialSchema = SchemaFactory.createForClass(FichaGerencial)