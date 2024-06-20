import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, Req, Logger } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto,@Req() req: Request) {
    const nomeDoAdministrador = req['usuario'];
    createUsuarioDto.ultimoEditor = nomeDoAdministrador;
    Logger.log(nomeDoAdministrador);
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('buscar')
  async findByNameOrMatriculaOrId(
    @Query('nomeCompleto') nomeCompleto?: string, 
    @Query('matricula') matricula?: string,
    @Query('id') id?: string
  ) {
    if (!nomeCompleto && !matricula && !id) {
      throw new BadRequestException('É necessário fornecer nomeCompleto, matricula ou id');
    }
    return this.usuariosService.findByNameOrMatriculaOrId(nomeCompleto, matricula, id);
  }

  @Patch('atualizar')
  async update(
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Req() req: Request,
    @Query('nomeCompleto') nomeCompleto?: string, 
    @Query('matricula') matricula?: string,
    @Query('id') id?: string
  ) {
    if (!nomeCompleto && !matricula && !id) {
      throw new BadRequestException('É necessário fornecer nomeCompleto, matricula ou id');
    }

    const nomeDoAdministrador = req['usuario'];
    updateUsuarioDto.ultimoEditor = nomeDoAdministrador;
    return this.usuariosService.update(updateUsuarioDto, nomeCompleto, matricula, id);
  }

  @Delete('remover')
  async remove(
    @Query('nomeCompleto') nomeCompleto?: string, 
    @Query('matricula') matricula?: string,
    @Query('id') id?: string
  ) {
    if (!nomeCompleto && !matricula && !id) {
      throw new BadRequestException('É necessário fornecer nomeCompleto, matricula ou id');
    }
    return this.usuariosService.remove(nomeCompleto, matricula, id);
  }
}
