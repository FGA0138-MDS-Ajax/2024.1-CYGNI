import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModel } from './schemas/usuario.schema';



@Module({
  imports:[MongooseModule.forFeature([{name: 'Usuario', schema: UsuarioModel}])],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule {}
