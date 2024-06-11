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
exports.EnderecoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const endereco_schema_1 = require("./schema/endereco.schema");
const mongoose = require("mongoose");
let EnderecoService = class EnderecoService {
    constructor(enderecoModel) {
        this.enderecoModel = enderecoModel;
    }
    async create(endereco) {
        try {
            const res = await this.enderecoModel.create(endereco);
            return res;
        }
        catch (error) {
            throw new Error(`Error creating endereco: ${error.message}`);
        }
    }
    async findAll() {
        try {
            const endereco = await this.enderecoModel.find();
            return endereco;
        }
        catch (error) {
            throw new Error(`Error fetching all enderecos: ${error.message}`);
        }
    }
    async findOne(id) {
        try {
            const endereco = await this.enderecoModel.findById(id);
            if (!endereco) {
                throw new common_1.NotFoundException(`Endereco with id ${id} not found`);
            }
            return endereco;
        }
        catch (error) {
            throw new Error(`Error fetching endereco with id ${id}: ${error.message}`);
        }
    }
    async update(id, endereco) {
        try {
            const updatedEndereco = await this.enderecoModel.findByIdAndUpdate(id, endereco, { new: true });
            if (!updatedEndereco) {
                throw new common_1.NotFoundException(`Endereco with id ${id} not found`);
            }
            return updatedEndereco;
        }
        catch (error) {
            throw new Error(`Error updating endereco with id ${id}: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            const result = await this.enderecoModel.findByIdAndDelete(id);
            if (!result) {
                throw new common_1.NotFoundException(`Endereco with id ${id} not found`);
            }
        }
        catch (error) {
            throw new Error(`Error deleting endereco with id ${id}: ${error.message}`);
        }
    }
};
exports.EnderecoService = EnderecoService;
exports.EnderecoService = EnderecoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(endereco_schema_1.Endereco.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], EnderecoService);
//# sourceMappingURL=endereco.service.js.map