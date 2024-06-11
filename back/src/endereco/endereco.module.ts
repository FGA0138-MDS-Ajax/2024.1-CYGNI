import { Module } from '@nestjs/common';
import { EnderecoController } from './endereco.controller';
import { EnderecoService } from './endereco.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EnderecoSchema } from './schema/endereco.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: "Endereco", schema:EnderecoSchema}])],
  controllers: [EnderecoController],
  providers: [EnderecoService]
})
export class EnderecoModule {}
