import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Logger, Req, BadRequestException } from '@nestjs/common';
import { AdministradoresService } from './administradores.service';
import { CreateAdministradorDto } from './dto/create-administrador.dto';
import { UpdateAdministradorDto } from './dto/update-administrador.dto';
import { LoginDTO } from './dto/login.dto';
import { VerificaTokenDto } from 'src/administradores/dto/verifica-token.dto';
import { RedefineSenhaDto } from './dto/troca-senha.dto';
import { EnviaEmailDTO } from './dto/envia-email.dto';

@Controller('administradores')
export class AdministradoresController {
  constructor(private readonly administradoresService: AdministradoresService) { }

  @Post()
  create(
    @Body() createAdministradorDto: CreateAdministradorDto,
    @Req() req :Request) {
    const privilegio = req['permissao']; //verifica o privilegio 
    if(!privilegio){
      throw new BadRequestException("Você não tem permissão"); //sem privilegio não cadastra
    }
    // Logger.log(privilegio);
    return this.administradoresService.create(createAdministradorDto);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.administradoresService.login(loginDTO);
  }

  @Get()
  findAll() {
    
    return this.administradoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {  //usado tipo string, para puxar pelo id do mongodb
    return this.administradoresService.findOne(id); 
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdministradorDto: UpdateAdministradorDto,@Req() req:Request) {
    const privilegio = req['permissao'];  //verifica o privilegio do usuario logado
    if(!privilegio){
      throw new BadRequestException("Você não tem permissão"); //se não tem o privilegio não permite editar
    }
    return this.administradoresService.update(id, updateAdministradorDto);
  }

  @Delete(':id')
  async remove(@Req() req :Request,@Param('id') id: string){ 
    const privilegio = req['permissao'];  //verifica o privilegio do usuario logado
    //Logger.log(privilegio);
    if(!privilegio){
      throw new BadRequestException("Você não tem permissão");//se não tem o privilegio não permite excluir
    }
    return this.administradoresService.remove(id);
  }

  @Post('email-redefinicao')
  @HttpCode(200)
  async enviaRedefinicaoDeSenha(@Body() enviaEmailDTO: EnviaEmailDTO) { 
    Logger.log(enviaEmailDTO);
    return this.administradoresService.enviaTokenRedefinirSenha(enviaEmailDTO.email);
  }

  @Post('verifica-token')
  @HttpCode(200)
  async verificaToken(@Body() verificaTokenDto: VerificaTokenDto) {
    const { token, email } = verificaTokenDto;
    return await this.administradoresService.verificaToken(email, token);
  }

  @Post('redefine-senha')
  @HttpCode(200)
  async trocaSenha(@Body() redefineSenhaDto: RedefineSenhaDto) {
    return await this.administradoresService.redefineSenha(redefineSenhaDto);
  }

  @Get("tokens")
  async tokens(){
    return await this.administradoresService.findAllTokens();
  }
}
