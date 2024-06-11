"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FichaGerencialModule = void 0;
const common_1 = require("@nestjs/common");
const ficha_gerencial_controller_1 = require("./ficha-gerencial.controller");
const ficha_gerencial_service_1 = require("./ficha-gerencial.service");
const mongoose_1 = require("@nestjs/mongoose");
const fichaGerencial_schema_1 = require("./schema/fichaGerencial.schema");
let FichaGerencialModule = class FichaGerencialModule {
};
exports.FichaGerencialModule = FichaGerencialModule;
exports.FichaGerencialModule = FichaGerencialModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: "FichaGerencial", schema: fichaGerencial_schema_1.FichaGerencialSchema }])],
        controllers: [ficha_gerencial_controller_1.FichaGerencialController],
        providers: [ficha_gerencial_service_1.FichaGerencialService]
    })
], FichaGerencialModule);
//# sourceMappingURL=ficha-gerencial.module.js.map