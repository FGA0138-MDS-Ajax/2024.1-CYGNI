import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Documento } from './schema/documentacao.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class DocumentoService {
    constructor(@InjectModel(Documento.name) private documentoModel: mongoose.Model<Documento>) {}

    async create(documento: Documento): Promise<Documento> {
        try {
            const res = await this.documentoModel.create(documento);
            return res;
        } catch (error) {
            throw new Error(`Error creating documento: ${error.message}`);
        }
    }

    async findAll(): Promise<Documento[]> {
        try {
            const documento = await this.documentoModel.find();
            return documento;
        } catch (error) {
            throw new Error(`Error fetching all documentos: ${error.message}`);
        }
    }

    async findOne(id: string): Promise<Documento> {
        try {
            const documento = await this.documentoModel.findById(id);
            if (!documento) {
                throw new NotFoundException(`Documento with id ${id} not found`);
            }
            return documento;
        } catch (error) {
            throw new Error(`Error fetching documento with id ${id}: ${error.message}`);
        }
    }

    async update(id: string, documento: Documento): Promise<Documento> {
        try {
            const updatedDocumento = await this.documentoModel.findByIdAndUpdate(id, documento, { new: true });
            if (!updatedDocumento) {
                throw new NotFoundException(`Documento with id ${id} not found`);
            }
            return updatedDocumento;
        } catch (error) {
            throw new Error(`Error updating documento with id ${id}: ${error.message}`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const result = await this.documentoModel.findByIdAndDelete(id);
            if (!result) {
                throw new NotFoundException(`Documento with id ${id} not found`);
            }
        } catch (error) {
            throw new Error(`Error deleting documento with id ${id}: ${error.message}`);
        }
    }
}
