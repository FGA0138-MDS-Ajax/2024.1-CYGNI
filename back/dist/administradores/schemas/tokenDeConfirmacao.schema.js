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
exports.TokenDeConfirmacaoSchema = exports.TokenDeConfirmacao = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let TokenDeConfirmacao = class TokenDeConfirmacao {
};
exports.TokenDeConfirmacao = TokenDeConfirmacao;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TokenDeConfirmacao.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TokenDeConfirmacao.prototype, "token", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], TokenDeConfirmacao.prototype, "valido", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: Date.now, expires: 3600 }),
    __metadata("design:type", Date)
], TokenDeConfirmacao.prototype, "createdAt", void 0);
exports.TokenDeConfirmacao = TokenDeConfirmacao = __decorate([
    (0, mongoose_1.Schema)()
], TokenDeConfirmacao);
exports.TokenDeConfirmacaoSchema = mongoose_1.SchemaFactory.createForClass(TokenDeConfirmacao);
//# sourceMappingURL=tokenDeConfirmacao.schema.js.map