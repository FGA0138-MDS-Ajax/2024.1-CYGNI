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
exports.FichaGerencial = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let FichaGerencial = class FichaGerencial {
};
exports.FichaGerencial = FichaGerencial;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], FichaGerencial.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FichaGerencial.prototype, "classificacao", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FichaGerencial.prototype, "funcao", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FichaGerencial.prototype, "escala", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], FichaGerencial.prototype, "horarioEscala", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FichaGerencial.prototype, "lotacao", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FichaGerencial.prototype, "comportamento", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], FichaGerencial.prototype, "porteDeArma", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], FichaGerencial.prototype, "admissao", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FichaGerencial.prototype, "apresentacao", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], FichaGerencial.prototype, "validadeBienal", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], FichaGerencial.prototype, "validadeTAF", void 0);
exports.FichaGerencial = FichaGerencial = __decorate([
    (0, mongoose_1.Schema)()
], FichaGerencial);
//# sourceMappingURL=fichaGerencial.schema.js.map