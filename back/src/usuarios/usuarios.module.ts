import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModel } from './schemas/usuario.schema';
import { ExtrairUsuarioMiddleware } from 'src/middlewares/extrair.usuario';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Usuario', schema: UsuarioModel }])],
  controllers: [UsuariosController],
  providers: [UsuariosService, JwtService],
})
export class UsuariosModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ExtrairUsuarioMiddleware)
      .forRoutes(
        { path: 'usuarios', method: RequestMethod.POST},
        { path: 'usuarios/atualizar', method: RequestMethod.PATCH},
        { path : 'usuarios/remover', method: RequestMethod.DELETE},
        { path: 'usuarios/buscar', method: RequestMethod.GET}
      );
  }
}