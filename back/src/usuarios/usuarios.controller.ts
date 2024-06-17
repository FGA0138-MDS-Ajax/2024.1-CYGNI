import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, BadRequestException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { VerificaTokenDto } from './dto/verifica-token.dto';
import { RedefineSenhaDto } from './dto/troca-senha.dto';
//import { AuthGuard } from 'src/auth-guard/auth-guard.guard';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) { }

  @Post()
  //@UseGuards(AuthGuard)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':nomeCompleto')
  async findByName(@Param('nomeCompleto') nomeCompleto: string) {
    if (!nomeCompleto) {
      throw new BadRequestException('O parâmetro nomeCompleto é obrigatório');
    }
    return this.usuariosService.findByName(nomeCompleto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }

}
