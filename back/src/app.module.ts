import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [ MongooseModule.forRoot(process.env.MONGODB_URI), UsuariosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}