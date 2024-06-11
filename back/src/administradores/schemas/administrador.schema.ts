import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AdministradorDocument = HydratedDocument<Administrador>;

@Schema()
export class Administrador {
    @Prop({required: true})
    login: string

    @Prop({required: true})
    senha: string
}

export const AdministradorModel = SchemaFactory.createForClass(Administrador)