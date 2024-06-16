import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(id);
  }

  @Post('email-redefinicao')
  async enviaRedefinicaoDeSenha(@Body('email') email: string) {
    return this.usuariosService.enviaTokenRedefinirSenha(email);
  }

  @Post('verifica-token')
  async verificaToken(@Body() verificaTokenDto: VerificaTokenDto) {
    const { token, email } = verificaTokenDto;
    return await this.usuariosService.verificaToken(email, token);
  }

  @Post('redefine-senha')
  async trocaSenha(@Body() redefineSenhaDto: RedefineSenhaDto) {
    const { email, novaSenha, novaSenhaConfirmacao, token } = redefineSenhaDto;

    return await this.usuariosService.redefineSenha(email, novaSenha, novaSenhaConfirmacao, token);
  }

}
