import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TokenDeConfirmacaoDocument = TokenDeConfirmacao & Document;

@Schema()
export class TokenDeConfirmacao {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  token: string;
  
  @Prop()
  valido: boolean;

  @Prop({ required: true, default: Date.now, expires: 3600 })
  createdAt: Date;
}

export const TokenDeConfirmacaoSchema = SchemaFactory.createForClass(TokenDeConfirmacao);
