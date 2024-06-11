"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnderecoModule = void 0;
const common_1 = require("@nestjs/common");
const endereco_controller_1 = require("./endereco.controller");
const endereco_service_1 = require("./endereco.service");
const mongoose_1 = require("@nestjs/mongoose");
const endereco_schema_1 = require("./schema/endereco.schema");
let EnderecoModule = class EnderecoModule {
};
exports.EnderecoModule = EnderecoModule;
exports.EnderecoModule = EnderecoModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: "Endereco", schema: endereco_schema_1.EnderecoSchema }])],
        controllers: [endereco_controller_1.EnderecoController],
        providers: [endereco_service_1.EnderecoService]
    })
], EnderecoModule);
//# sourceMappingURL=endereco.module.js.map