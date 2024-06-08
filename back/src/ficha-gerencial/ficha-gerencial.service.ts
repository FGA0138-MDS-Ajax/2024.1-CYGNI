import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FichaGerencial } from './schema/fichaGerencial.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class FichaGerencialService {
    constructor(@InjectModel(FichaGerencial.name) private fichaGerencialModel: mongoose.Model<FichaGerencial>) {}

    async create(fichaGerencial: FichaGerencial): Promise<FichaGerencial> {
        try {
            const res = await this.fichaGerencialModel.create(fichaGerencial);
            return res;
        } catch (error) {
            throw new Error(`Error creating ficha: ${error.message}`);
        }
    }

    async findAll(): Promise<FichaGerencial[]> {
        try {
            const fichaGerencial = await this.fichaGerencialModel.find();
            return fichaGerencial;
        } catch (error) {
            throw new Error(`Error fetching all fichas: ${error.message}`);
        }
    }

    async findOne(id: string): Promise<FichaGerencial> {
        try {
            const ficha = await this.fichaGerencialModel.findById(id);
            if (!ficha) {
                throw new NotFoundException(`Ficha with id ${id} not found`);
            }
            return ficha;
        } catch (error) {
            throw new Error(`Error fetching ficha with id ${id}: ${error.message}`);
        }
    }

    async update(id: string, fichaGerencial: FichaGerencial): Promise<FichaGerencial> {
        try {
            const updatedFicha = await this.fichaGerencialModel.findByIdAndUpdate(id, fichaGerencial, { new: true });
            if (!updatedFicha) {
                throw new NotFoundException(`Ficha with id ${id} not found`);
            }
            return updatedFicha;
        } catch (error) {
            throw new Error(`Error updating ficha with id ${id}: ${error.message}`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const result = await this.fichaGerencialModel.findByIdAndDelete(id);
            if (!result) {
                throw new NotFoundException(`Ficha with id ${id} not found`);
            }
        } catch (error) {
            throw new Error(`Error deleting ficha with id ${id}: ${error.message}`);
        }
    }
}
