import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { FichaGerencialService } from './ficha-gerencial.service';
import { FichaGerencial } from './schema/fichaGerencial.schema';

@Controller('ficha-gerencial')
export class FichaGerencialController {
    constructor(private fichaGerencialService: FichaGerencialService) {}

    @Get()
    async getAllFichas(): Promise<FichaGerencial[]> {
        try {
            return await this.fichaGerencialService.findAll();
        } catch (error) {
            
            throw new Error(`Erro ao buscar todas as fichas: ${error.message}`);
        }
    }

    @Get(':id')
    async getFichaGerencial(@Param('id') id: string): Promise<FichaGerencial> {
        try {
            return await this.fichaGerencialService.findOne(id);
        } catch (error) {
            throw new Error(`Erro ao buscar ficha com o id ${id}: ${error.message}`);
        }
    }

    @Post()
    async createFichaGerencial(
        @Body() fichaGerencial: FichaGerencial
    ): Promise<FichaGerencial> {
        try {
            return await this.fichaGerencialService.create(fichaGerencial);
        } catch (error) {
            throw new Error(`Erro ao criar ficha ${error.message}`);
        }
    }

    @Put(':id')
    async updateFichaGerencial(
        @Param('id') id: string,
        @Body() fichaGerencial: FichaGerencial
    ): Promise<FichaGerencial> {
        try {
            return await this.fichaGerencialService.update(id, fichaGerencial);
        } catch (error) {
            throw new Error(`Erro ao atualizar ficha com o id ${id}: ${error.message}`);
        }
    }

    @Delete(':id')
    async deleteFichaGerencial(@Param('id') id: string): Promise<void> {
        try {
            await this.fichaGerencialService.delete(id);
        } catch (error) {
            throw new Error(`Error ao deletar ficha com id ${id}: ${error.message}`);
        }
    }
}
