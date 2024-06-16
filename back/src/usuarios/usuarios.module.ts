import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModel } from './schemas/usuario.schema';
import { EmailService } from 'src/email/email.services';
import { TokenDeConfirmacao, TokenDeConfirmacaoSchema } from './schemas/tokenDeConfirmacao.schema';



@Module({
  imports:[MongooseModule.forFeature([{name: 'Usuario', schema: UsuarioModel}, {name: TokenDeConfirmacao.name, schema: TokenDeConfirmacaoSchema}])],
  controllers: [UsuariosController],
  providers: [UsuariosService, EmailService],
})
export class UsuariosModule {}