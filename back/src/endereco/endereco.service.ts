import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Endereco } from './schema/endereco.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class EnderecoService {
    constructor(@InjectModel(Endereco.name) private enderecoModel: mongoose.Model<Endereco>) {}

    async create(endereco: Endereco): Promise<Endereco> {
        try {
            const res = await this.enderecoModel.create(endereco);
            return res;
        } catch (error) {
            throw new Error(`Error creating endereco: ${error.message}`);
        }
    }

    async findAll(): Promise<Endereco[]> {
        try {
            const endereco = await this.enderecoModel.find();
            return endereco;
        } catch (error) {
            throw new Error(`Error fetching all enderecos: ${error.message}`);
        }
    }

    async findOne(id: string): Promise<Endereco> {
        try {
            const endereco = await this.enderecoModel.findById(id);
            if (!endereco) {
                throw new NotFoundException(`Endereco with id ${id} not found`);
            }
            return endereco;
        } catch (error) {
            throw new Error(`Error fetching endereco with id ${id}: ${error.message}`);
        }
    }

    async update(id: string, endereco: Endereco): Promise<Endereco> {
        try {
            const updatedEndereco = await this.enderecoModel.findByIdAndUpdate(id, endereco, { new: true });
            if (!updatedEndereco) {
                throw new NotFoundException(`Endereco with id ${id} not found`);
            }
            return updatedEndereco;
        } catch (error) {
            throw new Error(`Error updating endereco with id ${id}: ${error.message}`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const result = await this.enderecoModel.findByIdAndDelete(id);
            if (!result) {
                throw new NotFoundException(`Endereco with id ${id} not found`);
            }
        } catch (error) {
            throw new Error(`Error deleting endereco with id ${id}: ${error.message}`);
        }
    }
}
