"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FichaGerencialService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const fichaGerencial_schema_1 = require("./schema/fichaGerencial.schema");
const mongoose = require("mongoose");
let FichaGerencialService = class FichaGerencialService {
    constructor(fichaGerencialModel) {
        this.fichaGerencialModel = fichaGerencialModel;
    }
    async create(fichaGerencial) {
        try {
            const res = await this.fichaGerencialModel.create(fichaGerencial);
            return res;
        }
        catch (error) {
            throw new Error(`Error creating ficha: ${error.message}`);
        }
    }
    async findAll() {
        try {
            const fichaGerencial = await this.fichaGerencialModel.find();
            return fichaGerencial;
        }
        catch (error) {
            throw new Error(`Error fetching all fichas: ${error.message}`);
        }
    }
    async findOne(id) {
        try {
            const ficha = await this.fichaGerencialModel.findById(id);
            if (!ficha) {
                throw new common_1.NotFoundException(`Ficha with id ${id} not found`);
            }
            return ficha;
        }
        catch (error) {
            throw new Error(`Error fetching ficha with id ${id}: ${error.message}`);
        }
    }
    async update(id, fichaGerencial) {
        try {
            const updatedFicha = await this.fichaGerencialModel.findByIdAndUpdate(id, fichaGerencial, { new: true });
            if (!updatedFicha) {
                throw new common_1.NotFoundException(`Ficha with id ${id} not found`);
            }
            return updatedFicha;
        }
        catch (error) {
            throw new Error(`Error updating ficha with id ${id}: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            const result = await this.fichaGerencialModel.findByIdAndDelete(id);
            if (!result) {
                throw new common_1.NotFoundException(`Ficha with id ${id} not found`);
            }
        }
        catch (error) {
            throw new Error(`Error deleting ficha with id ${id}: ${error.message}`);
        }
    }
};
exports.FichaGerencialService = FichaGerencialService;
exports.FichaGerencialService = FichaGerencialService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(fichaGerencial_schema_1.FichaGerencial.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], FichaGerencialService);
//# sourceMappingURL=ficha-gerencial.service.js.map