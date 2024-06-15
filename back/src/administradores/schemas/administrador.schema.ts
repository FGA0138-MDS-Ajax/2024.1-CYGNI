import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AdministradorDocument = HydratedDocument<Administrador>;

@Schema()
export class Administrador {
    @Prop({required:true})
    login: string

    @Prop({required:true})
    senha: string

    @Prop()
    privilegios: number

    @Prop()
    nome: string

    @Prop()
    email: string
}

export const AdministradorModel = SchemaFactory.createForClass(Administrador)