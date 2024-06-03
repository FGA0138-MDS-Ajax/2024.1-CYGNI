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
exports.FichaGerencialService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const fichaGerencial_schema_1 = require("./schema/fichaGerencial.schema");
const mongoose = require("mongoose");
let FichaGerencialService = class FichaGerencialService {
    constructor(fichaGerencialModel) {
        this.fichaGerencialModel = fichaGerencialModel;
    }
    async create(fichaGerencial) {
        const res = await this.fichaGerencialModel.create(fichaGerencial);
        return res;
    }
    async findAll() {
        const fichaGerencial = await this.fichaGerencialModel.find();
        return fichaGerencial;
    }
};
exports.FichaGerencialService = FichaGerencialService;
exports.FichaGerencialService = FichaGerencialService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(fichaGerencial_schema_1.FichaGerencial.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], FichaGerencialService);
//# sourceMappingURL=ficha-gerencial.service.js.map