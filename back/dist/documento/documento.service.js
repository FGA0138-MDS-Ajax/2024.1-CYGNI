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
exports.DocumentoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const documentacao_schema_1 = require("./schema/documentacao.schema");
const mongoose = require("mongoose");
let DocumentoService = class DocumentoService {
    constructor(documentoModel) {
        this.documentoModel = documentoModel;
    }
    async create(documento) {
        try {
            const res = await this.documentoModel.create(documento);
            return res;
        }
        catch (error) {
            throw new Error(`Error creating documento: ${error.message}`);
        }
    }
    async findAll() {
        try {
            const documento = await this.documentoModel.find();
            return documento;
        }
        catch (error) {
            throw new Error(`Error fetching all documentos: ${error.message}`);
        }
    }
    async findOne(id) {
        try {
            const documento = await this.documentoModel.findById(id);
            if (!documento) {
                throw new common_1.NotFoundException(`Documento with id ${id} not found`);
            }
            return documento;
        }
        catch (error) {
            throw new Error(`Error fetching documento with id ${id}: ${error.message}`);
        }
    }
    async update(id, documento) {
        try {
            const updatedDocumento = await this.documentoModel.findByIdAndUpdate(id, documento, { new: true });
            if (!updatedDocumento) {
                throw new common_1.NotFoundException(`Documento with id ${id} not found`);
            }
            return updatedDocumento;
        }
        catch (error) {
            throw new Error(`Error updating documento with id ${id}: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            const result = await this.documentoModel.findByIdAndDelete(id);
            if (!result) {
                throw new common_1.NotFoundException(`Documento with id ${id} not found`);
            }
        }
        catch (error) {
            throw new Error(`Error deleting documento with id ${id}: ${error.message}`);
        }
    }
};
exports.DocumentoService = DocumentoService;
exports.DocumentoService = DocumentoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(documentacao_schema_1.Documento.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], DocumentoService);
//# sourceMappingURL=documento.service.js.map