import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { Documento } from './schema/documentacao.schema';

@Controller('documento')
export class DocumentoController {
    constructor(private documentoService: DocumentoService) {}

    @Get()
    async getAllFichas(): Promise<Documento[]> {
        try {
            return await this.documentoService.findAll();
        } catch (error) {
            
            throw new Error(`Erro ao buscar todas os documentos: ${error.message}`);
        }
    }

    @Get(':id')
    async getDocumento(@Param('id') id: string): Promise<Documento> {
        try {
            return await this.documentoService.findOne(id);
        } catch (error) {
            throw new Error(`Erro ao buscar documento com o id ${id}: ${error.message}`);
        }
    }

    @Post()
    async createDocumento(
        @Body() documento: Documento
    ): Promise<Documento> {
        try {
            return await this.documentoService.create(documento);
        } catch (error) {
            throw new Error(`Erro ao criar documento ${error.message}`);
        }
    }

    @Put(':id')
    async updateDocumento(
        @Param('id') id: string,
        @Body() documento: Documento
    ): Promise<Documento> {
        try {
            return await this.documentoService.update(id, documento);
        } catch (error) {
            throw new Error(`Erro ao atualizar documento com o id ${id}: ${error.message}`);
        }
    }

    @Delete(':id')
    async deleteDocumento(@Param('id') id: string): Promise<void> {
        try {
            await this.documentoService.delete(id);
        } catch (error) {
            throw new Error(`Error ao deletar documento com id ${id}: ${error.message}`);
        }
    }
}
