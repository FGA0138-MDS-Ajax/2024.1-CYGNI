import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config'
import { UsuariosModule } from './usuarios/usuarios.module';
import { FichaGerencialModule } from './ficha-gerencial/ficha-gerencial.module';
import { DocumentoModule } from './documento/documento.module';
import { EnderecoModule } from './endereco/endereco.module';
import { AdministradoresModule } from './administradores/administradores.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI), 
    UsuariosModule, FichaGerencialModule, DocumentoModule, EnderecoModule, AdministradoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
