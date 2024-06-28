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
exports.AdministradoresController = void 0;
const common_1 = require("@nestjs/common");
const administradores_service_1 = require("./administradores.service");
const create_administrador_dto_1 = require("./dto/create-administrador.dto");
const update_administrador_dto_1 = require("./dto/update-administrador.dto");
const login_dto_1 = require("./dto/login.dto");
const verifica_token_dto_1 = require("./dto/verifica-token.dto");
const troca_senha_dto_1 = require("./dto/troca-senha.dto");
const envia_email_dto_1 = require("./dto/envia-email.dto");
let AdministradoresController = class AdministradoresController {
    constructor(administradoresService) {
        this.administradoresService = administradoresService;
    }
    create(createAdministradorDto) {
        return this.administradoresService.create(createAdministradorDto);
    }
    login(loginDTO) {
        return this.administradoresService.login(loginDTO);
    }
    findAll() {
        return this.administradoresService.findAll();
    }
    findOne(id) {
        return this.administradoresService.findOne(id);
    }
    update(id, updateAdministradorDto) {
        return this.administradoresService.update(id, updateAdministradorDto);
    }
    remove(id) {
        return this.administradoresService.remove(id);
    }
    async enviaRedefinicaoDeSenha(enviaEmailDTO) {
        common_1.Logger.log(enviaEmailDTO);
        return this.administradoresService.enviaTokenRedefinirSenha(enviaEmailDTO.email);
    }
    async verificaToken(verificaTokenDto) {
        const { token, email } = verificaTokenDto;
        return await this.administradoresService.verificaToken(email, token);
    }
    async trocaSenha(redefineSenhaDto) {
        return await this.administradoresService.redefineSenha(redefineSenhaDto);
    }
    async tokens() {
        return await this.administradoresService.findAllTokens();
    }
};
exports.AdministradoresController = AdministradoresController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_administrador_dto_1.CreateAdministradorDto]),
    __metadata("design:returntype", void 0)
], AdministradoresController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDTO]),
    __metadata("design:returntype", void 0)
], AdministradoresController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdministradoresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdministradoresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_administrador_dto_1.UpdateAdministradorDto]),
    __metadata("design:returntype", void 0)
], AdministradoresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdministradoresController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('email-redefinicao'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [envia_email_dto_1.EnviaEmailDTO]),
    __metadata("design:returntype", Promise)
], AdministradoresController.prototype, "enviaRedefinicaoDeSenha", null);
__decorate([
    (0, common_1.Post)('verifica-token'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verifica_token_dto_1.VerificaTokenDto]),
    __metadata("design:returntype", Promise)
], AdministradoresController.prototype, "verificaToken", null);
__decorate([
    (0, common_1.Post)('redefine-senha'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [troca_senha_dto_1.RedefineSenhaDto]),
    __metadata("design:returntype", Promise)
], AdministradoresController.prototype, "trocaSenha", null);
__decorate([
    (0, common_1.Get)("tokens"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdministradoresController.prototype, "tokens", null);
exports.AdministradoresController = AdministradoresController = __decorate([
    (0, common_1.Controller)('administradores'),
    __metadata("design:paramtypes", [administradores_service_1.AdministradoresService])
], AdministradoresController);
//# sourceMappingURL=administradores.controller.js.map