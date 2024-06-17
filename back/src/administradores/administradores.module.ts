import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdministradoresController } from './administradores.controller';
import { AdministradoresService } from './administradores.service';
import { Administrador, AdministradorModel } from './schemas/administrador.schema';
import { JwtModule } from '@nestjs/jwt';
import { TokenDeConfirmacao, TokenDeConfirmacaoSchema } from './schemas/tokenDeConfirmacao.schema';
import { EmailService } from 'src/email/email.services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Administrador.name, schema: AdministradorModel }, { name: TokenDeConfirmacao.name, schema: TokenDeConfirmacaoSchema}]),
    JwtModule
  ],
  controllers: [AdministradoresController],
  providers: [AdministradoresService, EmailService],
})
export class AdministradoresModule {}