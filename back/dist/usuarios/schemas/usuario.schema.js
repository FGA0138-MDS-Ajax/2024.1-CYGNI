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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModel = exports.Usuario = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Usuario = class Usuario {
};
exports.Usuario = Usuario;
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Usuario.prototype, "nomeCompleto", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Usuario.prototype, "matricula", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "nomeGuerra", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "nomeMae", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "nomePai", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "sexo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null, type: Date }),
    __metadata("design:type", Date)
], Usuario.prototype, "dataDeNascimento", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "tipoSanguineo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "estadoCivil", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "telefone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "postGrad", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "escolaridade", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "rg", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "cpf", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "matSiape", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "cnhProntuario", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "cnhCategoria", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null, type: Date }),
    __metadata("design:type", Date)
], Usuario.prototype, "cnhValidade", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "cep", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "bairro", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "cidade", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "uf", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "logradouro", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "classificacao", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "funcao", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "escala", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null, type: Date }),
    __metadata("design:type", Date)
], Usuario.prototype, "escalaInicio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "horarioEscala", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "lotacao", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "comportamento", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "porteArma", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null, type: Date }),
    __metadata("design:type", Date)
], Usuario.prototype, "admissao", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null, type: Date }),
    __metadata("design:type", Date)
], Usuario.prototype, "apresentacao", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null, type: Date }),
    __metadata("design:type", Date)
], Usuario.prototype, "validadeBienal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null, type: Date }),
    __metadata("design:type", Date)
], Usuario.prototype, "validadeTAF", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: () => [] }),
    __metadata("design:type", Array)
], Usuario.prototype, "motivo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: () => [] }),
    __metadata("design:type", Array)
], Usuario.prototype, "anoReferencia", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: () => [], type: [Date] }),
    __metadata("design:type", Array)
], Usuario.prototype, "dataInicio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: () => [], type: [Date] }),
    __metadata("design:type", Array)
], Usuario.prototype, "dataTermino", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: () => [] }),
    __metadata("design:type", Array)
], Usuario.prototype, "dias", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "observacoes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: null }),
    __metadata("design:type", String)
], Usuario.prototype, "ultimoEditor", void 0);
exports.Usuario = Usuario = __decorate([
    (0, mongoose_1.Schema)()
], Usuario);
exports.UsuarioModel = mongoose_1.SchemaFactory.createForClass(Usuario);
//# sourceMappingURL=usuario.schema.js.map