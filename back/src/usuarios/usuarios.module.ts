import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
      .forRoutes(UsuariosController);
  }
}