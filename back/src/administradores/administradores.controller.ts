import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';

@Controller('administradores')
export class AdministradoresController {
  constructor(private readonly administradoresService: AdministradoresService) {}

  @Post()
  create(@Body() createAdministradorDto: CreateAdministradorDto) {
    return this.administradoresService.create(createAdministradorDto);
  }

  @Get()
  findAll() {
    return this.administradoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.administradoresService.findOne(id); //usado tipo string, para puxar pelo id do mongodb
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministradorDto: UpdateAdministradorDto) {
    return this.administradoresService.update(id, updateAdministradorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.administradoresService.remove(id);
  }
}
