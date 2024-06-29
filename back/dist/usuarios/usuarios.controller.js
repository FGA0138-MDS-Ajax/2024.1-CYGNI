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
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./usuarios.service");
const create_usuario_dto_1 = require("./dto/create-usuario.dto");
const update_usuario_dto_1 = require("./dto/update-usuario.dto");
let UsuariosController = class UsuariosController {
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    create(createUsuarioDto, req) {
        const nomeDoAdministrador = req['usuario'];
        createUsuarioDto.ultimoEditor = nomeDoAdministrador;
        return this.usuariosService.create(createUsuarioDto);
    }
    findAll() {
        return this.usuariosService.findAll();
    }
    async findByNameOrMatriculaOrId(nomeCompleto, matricula, id) {
        if (!nomeCompleto && !matricula && !id) {
            throw new common_1.BadRequestException('É necessário fornecer nomeCompleto, matricula ou id');
        }
        return this.usuariosService.findByNameOrMatriculaOrId(nomeCompleto, matricula, id);
    }
    async update(updateUsuarioDto, req, nomeCompleto, matricula, id) {
        if (!nomeCompleto && !matricula && !id) {
            throw new common_1.BadRequestException('É necessário fornecer nomeCompleto, matricula ou id');
        }
        const nomeDoAdministrador = req['usuario'];
        updateUsuarioDto.ultimoEditor = nomeDoAdministrador;
        return this.usuariosService.update(updateUsuarioDto, nomeCompleto, matricula, id);
    }
    async remove(nomeCompleto, matricula, id) {
        if (!nomeCompleto && !matricula && !id) {
            throw new common_1.BadRequestException('É necessário fornecer nomeCompleto, matricula ou id');
        }
        return this.usuariosService.remove(nomeCompleto, matricula, id);
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_dto_1.CreateUsuarioDto, Request]),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuariosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('buscar'),
    __param(0, (0, common_1.Query)('nomeCompleto')),
    __param(1, (0, common_1.Query)('matricula')),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "findByNameOrMatriculaOrId", null);
__decorate([
    (0, common_1.Patch)('atualizar'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)('nomeCompleto')),
    __param(3, (0, common_1.Query)('matricula')),
    __param(4, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_usuario_dto_1.UpdateUsuarioDto,
        Request, String, String, String]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('remover'),
    __param(0, (0, common_1.Query)('nomeCompleto')),
    __param(1, (0, common_1.Query)('matricula')),
    __param(2, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "remove", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map