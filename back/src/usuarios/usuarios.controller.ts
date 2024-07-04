import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, Req, Logger } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(
  @Body() createUsuarioDto: CreateUsuarioDto,
  @Req() req: Request) { // request utilizado na verificação se o funcionario atual tem essa permissão
    const nomeDoAdministrador = req['usuario']; //salva nome de quem editou a ficha
    const privilegio = req['permissao']; //pega a permissão do usuario logado a cada requisição deste tipo
    if(!privilegio){
      throw new BadRequestException("Você não tem permissão para isso")
    }
    createUsuarioDto.ultimoEditor = nomeDoAdministrador; //atribui o login ao campo ultimoEditor da ficha
    //Logger.log(nomeDoAdministrador);
    return this.usuariosService.create(createUsuarioDto); 
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('buscar')
  async findByNameOrMatriculaOrId(
    @Query('nomeCompleto') nomeCompleto?: string, 
    @Query('matricula') matricula?: string, // querys para possibilitar vários tipos de pesquisa no campo ficha
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
    @Req() req: Request, //requisição para validação de usuario
    @Query('nomeCompleto') nomeCompleto?: string, //querys para possibilitar vários tipos de pesquisa no campo ficha
    @Query('matricula') matricula?: string,
    @Query('id') id?: string
  ) {
    if (!nomeCompleto && !matricula && !id) {
      throw new BadRequestException('É necessário fornecer nomeCompleto, matricula ou id');
    }

    const nomeDoAdministrador = req['usuario'];
    const privilegio = req['permissao']; //para verificação de permissão
    if(!privilegio){
      throw new BadRequestException("Você não tem permissão para isso")
    }
    updateUsuarioDto.ultimoEditor = nomeDoAdministrador; //ultimo editor da ficha
    //Logger.log(nomeDoAdministrador);
    return this.usuariosService.update(updateUsuarioDto, nomeCompleto, matricula, id);
  }

  @Delete('remover')
  async remove(
    @Req() req: Request, //requisição para validação de usuario
    @Query('nomeCompleto') nomeCompleto?: string, 
    @Query('matricula') matricula?: string, //querys para possibilitar vários tipos de pesquisa no campo ficha
    @Query('id') id?: string
  ) {
    if (!nomeCompleto && !matricula && !id) {
      throw new BadRequestException('É necessário fornecer nomeCompleto, matricula ou id');
    }
    const privilegio = req['permissao']; // verificação de permissão
    if(!privilegio){
      throw new BadRequestException("Você não tem permissão para isso")
    }
    return this.usuariosService.remove(nomeCompleto, matricula, id);
  }
}
