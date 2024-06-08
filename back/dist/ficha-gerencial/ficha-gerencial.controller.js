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
exports.FichaGerencialController = void 0;
const common_1 = require("@nestjs/common");
const ficha_gerencial_service_1 = require("./ficha-gerencial.service");
const fichaGerencial_schema_1 = require("./schema/fichaGerencial.schema");
let FichaGerencialController = class FichaGerencialController {
    constructor(fichaGerencialService) {
        this.fichaGerencialService = fichaGerencialService;
    }
    async getAllFichas() {
        try {
            return await this.fichaGerencialService.findAll();
        }
        catch (error) {
            throw new Error(`Erro ao buscar todas as fichas: ${error.message}`);
        }
    }
    async getFichaGerencial(id) {
        try {
            return await this.fichaGerencialService.findOne(id);
        }
        catch (error) {
            throw new Error(`Erro ao buscar ficha com o id ${id}: ${error.message}`);
        }
    }
    async createFichaGerencial(fichaGerencial) {
        try {
            return await this.fichaGerencialService.create(fichaGerencial);
        }
        catch (error) {
            throw new Error(`Erro ao criar ficha ${error.message}`);
        }
    }
    async updateFichaGerencial(id, fichaGerencial) {
        try {
            return await this.fichaGerencialService.update(id, fichaGerencial);
        }
        catch (error) {
            throw new Error(`Erro ao atualizar ficha com o id ${id}: ${error.message}`);
        }
    }
    async deleteFichaGerencial(id) {
        try {
            await this.fichaGerencialService.delete(id);
        }
        catch (error) {
            throw new Error(`Error ao deletar ficha com id ${id}: ${error.message}`);
        }
    }
};
exports.FichaGerencialController = FichaGerencialController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FichaGerencialController.prototype, "getAllFichas", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FichaGerencialController.prototype, "getFichaGerencial", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fichaGerencial_schema_1.FichaGerencial]),
    __metadata("design:returntype", Promise)
], FichaGerencialController.prototype, "createFichaGerencial", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, fichaGerencial_schema_1.FichaGerencial]),
    __metadata("design:returntype", Promise)
], FichaGerencialController.prototype, "updateFichaGerencial", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FichaGerencialController.prototype, "deleteFichaGerencial", null);
exports.FichaGerencialController = FichaGerencialController = __decorate([
    (0, common_1.Controller)('ficha-gerencial'),
    __metadata("design:paramtypes", [ficha_gerencial_service_1.FichaGerencialService])
], FichaGerencialController);
//# sourceMappingURL=ficha-gerencial.controller.js.map