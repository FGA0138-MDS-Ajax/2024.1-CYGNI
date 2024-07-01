import { MiddlewareConsumer, Module, NestModule, Patch, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdministradoresController } from './administradores.controller';
import { AdministradoresService } from './administradores.service';
import { Administrador, AdministradorModel } from './schemas/administrador.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenDeConfirmacao, TokenDeConfirmacaoSchema } from './schemas/tokenDeConfirmacao.schema';
import { EmailService } from 'src/email/email.services';
import { ExtrairUsuarioMiddleware } from 'src/middlewares/extrair.usuario';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Administrador.name, schema: AdministradorModel }, { name: TokenDeConfirmacao.name, schema: TokenDeConfirmacaoSchema}]),
    JwtModule
  ],
  controllers: [AdministradoresController],
  providers: [AdministradoresService, EmailService,JwtService],
})
export class AdministradoresModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExtrairUsuarioMiddleware)
      .forRoutes(
        { path: 'administradores', method: RequestMethod.POST},
        { path: 'administradores/:id', method: RequestMethod.DELETE},
        { path: 'administradores/:id',method:RequestMethod.PATCH}
      );
  }


}