"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosModule = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./usuarios.service");
const usuarios_controller_1 = require("./usuarios.controller");
const mongoose_1 = require("@nestjs/mongoose");
const usuario_schema_1 = require("./schemas/usuario.schema");
const extrair_usuario_1 = require("../middlewares/extrair.usuario");
const jwt_1 = require("@nestjs/jwt");
let UsuariosModule = class UsuariosModule {
    configure(consumer) {
        consumer
            .apply(extrair_usuario_1.ExtrairUsuarioMiddleware)
            .forRoutes({ path: 'usuarios', method: common_1.RequestMethod.POST }, { path: 'usuarios/atualizar', method: common_1.RequestMethod.PATCH }, { path: 'usuarios/remover', method: common_1.RequestMethod.DELETE }, { path: 'usuarios/buscar', method: common_1.RequestMethod.GET });
    }
};
exports.UsuariosModule = UsuariosModule;
exports.UsuariosModule = UsuariosModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'Usuario', schema: usuario_schema_1.UsuarioModel }])],
        controllers: [usuarios_controller_1.UsuariosController],
        providers: [usuarios_service_1.UsuariosService, jwt_1.JwtService],
    })
], UsuariosModule);
//# sourceMappingURL=usuarios.module.js.map