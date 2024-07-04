import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config'
import { UsuariosModule } from './usuarios/usuarios.module';
import { AdministradoresModule } from './administradores/administradores.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI), 
    UsuariosModule, AdministradoresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
