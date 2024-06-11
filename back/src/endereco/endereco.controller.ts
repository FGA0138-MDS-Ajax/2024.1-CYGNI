import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { Endereco } from './schema/endereco.schema';

@Controller('endereco')
export class EnderecoController {
    constructor(private enderecoService: EnderecoService) {}

    @Get()
    async getAllFichas(): Promise<Endereco[]> {
        try {
            return await this.enderecoService.findAll();
        } catch (error) {
            
            throw new Error(`Erro ao buscar todas os enderecos: ${error.message}`);
        }
    }

    @Get(':id')
    async getEndereco(@Param('id') id: string): Promise<Endereco> {
        try {
            return await this.enderecoService.findOne(id);
        } catch (error) {
            throw new Error(`Erro ao buscar endereco com o id ${id}: ${error.message}`);
        }
    }

    @Post()
    async createEndereco(
        @Body() endereco: Endereco
    ): Promise<Endereco> {
        try {
            return await this.enderecoService.create(endereco);
        } catch (error) {
            throw new Error(`Erro ao criar endereco ${error.message}`);
        }
    }

    @Put(':id')
    async updateEndereco(
        @Param('id') id: string,
        @Body() endereco: Endereco
    ): Promise<Endereco> {
        try {
            return await this.enderecoService.update(id, endereco);
        } catch (error) {
            throw new Error(`Erro ao atualizar endereco com o id ${id}: ${error.message}`);
        }
    }

    @Delete(':id')
    async deleteEndereco(@Param('id') id: string): Promise<void> {
        try {
            await this.enderecoService.delete(id);
        } catch (error) {
            throw new Error(`Error ao deletar endereco com id ${id}: ${error.message}`);
        }
    }
}
