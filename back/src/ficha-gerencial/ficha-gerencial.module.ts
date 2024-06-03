import { Module } from '@nestjs/common';
import { FichaGerencialController } from './ficha-gerencial.controller';
import { FichaGerencialService } from './ficha-gerencial.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FichaGerencialSchema } from './schema/fichaGerencial.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "FichaGerencial", schema:FichaGerencialSchema}])],
  controllers: [FichaGerencialController],
  providers: [FichaGerencialService]
})
export class FichaGerencialModule {}
