import { Body, Controller, Get, Post } from '@nestjs/common';
import { FichaGerencialService } from './ficha-gerencial.service';
import { FichaGerencial } from './schema/fichaGerencial.schema';

@Controller('ficha-gerencial')
export class FichaGerencialController {
    constructor(private fichaGerencialService: FichaGerencialService){}

    @Get()
    async getAllFichas(): Promise<FichaGerencial[]>{
        return this.fichaGerencialService.findAll();
    }

    @Post()
    async createFichaGerencial(
        @Body()
        FichaGerencial
    ): Promise<FichaGerencial>{
        return this.fichaGerencialService.create(FichaGerencial);
    }
}
