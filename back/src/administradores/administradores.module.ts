import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdministradoresController } from './administradores.controller';
import { AdministradoresService } from './administradores.service';
import { Administrador, AdministradorModel } from './schemas/administrador.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Administrador.name, schema: AdministradorModel }])
  ],
  controllers: [AdministradoresController],
  providers: [AdministradoresService],
})
export class AdministradoresModule {}