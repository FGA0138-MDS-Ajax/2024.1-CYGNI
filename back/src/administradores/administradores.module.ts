import { Module } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { AdministradoresController } from './administradores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdministradorModel } from './schemas/administrador.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: 'Administrador', schema: AdministradorModel}])],
  controllers: [AdministradoresController],
  providers: [AdministradoresService],
})
export class AdministradoresModule {}
