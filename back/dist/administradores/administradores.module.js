"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministradoresModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const administradores_controller_1 = require("./administradores.controller");
const administradores_service_1 = require("./administradores.service");
const administrador_schema_1 = require("./schemas/administrador.schema");
const jwt_1 = require("@nestjs/jwt");
const tokenDeConfirmacao_schema_1 = require("./schemas/tokenDeConfirmacao.schema");
const email_services_1 = require("../email/email.services");
let AdministradoresModule = class AdministradoresModule {
};
exports.AdministradoresModule = AdministradoresModule;
exports.AdministradoresModule = AdministradoresModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: administrador_schema_1.Administrador.name, schema: administrador_schema_1.AdministradorModel }, { name: tokenDeConfirmacao_schema_1.TokenDeConfirmacao.name, schema: tokenDeConfirmacao_schema_1.TokenDeConfirmacaoSchema }]),
            jwt_1.JwtModule
        ],
        controllers: [administradores_controller_1.AdministradoresController],
        providers: [administradores_service_1.AdministradoresService, email_services_1.EmailService],
    })
], AdministradoresModule);
//# sourceMappingURL=administradores.module.js.map