import { Module } from '@nestjs/common';
import { AdministradorService } from './administradores.service';
import { AdministradoresController } from './administradores.controller';

@Module({
  controllers: [AdministradoresController],
  providers: [AdministradorService],
})
export class AdministradoresModule {}
