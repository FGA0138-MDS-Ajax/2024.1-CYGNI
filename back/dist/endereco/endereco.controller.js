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
exports.EnderecoController = void 0;
const common_1 = require("@nestjs/common");
const endereco_service_1 = require("./endereco.service");
const endereco_schema_1 = require("./schema/endereco.schema");
let EnderecoController = class EnderecoController {
    constructor(enderecoService) {
        this.enderecoService = enderecoService;
    }
    async getAllFichas() {
        try {
            return await this.enderecoService.findAll();
        }
        catch (error) {
            throw new Error(`Erro ao buscar todas os enderecos: ${error.message}`);
        }
    }
    async getEndereco(id) {
        try {
            return await this.enderecoService.findOne(id);
        }
        catch (error) {
            throw new Error(`Erro ao buscar endereco com o id ${id}: ${error.message}`);
        }
    }
    async createEndereco(endereco) {
        try {
            return await this.enderecoService.create(endereco);
        }
        catch (error) {
            throw new Error(`Erro ao criar endereco ${error.message}`);
        }
    }
    async updateEndereco(id, endereco) {
        try {
            return await this.enderecoService.update(id, endereco);
        }
        catch (error) {
            throw new Error(`Erro ao atualizar endereco com o id ${id}: ${error.message}`);
        }
    }
    async deleteEndereco(id) {
        try {
            await this.enderecoService.delete(id);
        }
        catch (error) {
            throw new Error(`Error ao deletar endereco com id ${id}: ${error.message}`);
        }
    }
};
exports.EnderecoController = EnderecoController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "getAllFichas", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "getEndereco", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [endereco_schema_1.Endereco]),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "createEndereco", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, endereco_schema_1.Endereco]),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "updateEndereco", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnderecoController.prototype, "deleteEndereco", null);
exports.EnderecoController = EnderecoController = __decorate([
    (0, common_1.Controller)('endereco'),
    __metadata("design:paramtypes", [endereco_service_1.EnderecoService])
], EnderecoController);
//# sourceMappingURL=endereco.controller.js.map