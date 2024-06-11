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
exports.DocumentoController = void 0;
const common_1 = require("@nestjs/common");
const documento_service_1 = require("./documento.service");
const documentacao_schema_1 = require("./schema/documentacao.schema");
let DocumentoController = class DocumentoController {
    constructor(documentoService) {
        this.documentoService = documentoService;
    }
    async getAllFichas() {
        try {
            return await this.documentoService.findAll();
        }
        catch (error) {
            throw new Error(`Erro ao buscar todas os documentos: ${error.message}`);
        }
    }
    async getDocumento(id) {
        try {
            return await this.documentoService.findOne(id);
        }
        catch (error) {
            throw new Error(`Erro ao buscar documento com o id ${id}: ${error.message}`);
        }
    }
    async createDocumento(documento) {
        try {
            return await this.documentoService.create(documento);
        }
        catch (error) {
            throw new Error(`Erro ao criar documento ${error.message}`);
        }
    }
    async updateDocumento(id, documento) {
        try {
            return await this.documentoService.update(id, documento);
        }
        catch (error) {
            throw new Error(`Erro ao atualizar documento com o id ${id}: ${error.message}`);
        }
    }
    async deleteDocumento(id) {
        try {
            await this.documentoService.delete(id);
        }
        catch (error) {
            throw new Error(`Error ao deletar documento com id ${id}: ${error.message}`);
        }
    }
};
exports.DocumentoController = DocumentoController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocumentoController.prototype, "getAllFichas", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentoController.prototype, "getDocumento", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [documentacao_schema_1.Documento]),
    __metadata("design:returntype", Promise)
], DocumentoController.prototype, "createDocumento", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, documentacao_schema_1.Documento]),
    __metadata("design:returntype", Promise)
], DocumentoController.prototype, "updateDocumento", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentoController.prototype, "deleteDocumento", null);
exports.DocumentoController = DocumentoController = __decorate([
    (0, common_1.Controller)('documento'),
    __metadata("design:paramtypes", [documento_service_1.DocumentoService])
], DocumentoController);
//# sourceMappingURL=documento.controller.js.map