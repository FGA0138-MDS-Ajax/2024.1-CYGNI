import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FichaGerencial } from './schema/fichaGerencial.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class FichaGerencialService {
    constructor(@InjectModel(FichaGerencial.name) private fichaGerencialModel: mongoose.Model<FichaGerencial>) {}

    async create (fichaGerencial: FichaGerencial): Promise<FichaGerencial>{

        const res = await this.fichaGerencialModel.create(fichaGerencial);
        return res;
    }

    async findAll(): Promise<FichaGerencial[]> {
        const fichaGerencial = await this.fichaGerencialModel.find();
        return fichaGerencial;
    }

}
