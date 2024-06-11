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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const usuario_schema_1 = require("./schemas/usuario.schema");
const common_2 = require("@nestjs/common");
const mongoose_3 = require("mongoose");

let UsuariosService = class UsuariosService {
    constructor(usuarioModel) {
        this.usuarioModel = usuarioModel;
    }
    async create(createUsuarioDto) {
        const newUser = new this.usuarioModel(createUsuarioDto);
        return await newUser.save();
    }
    async findAll() {
        return await this.usuarioModel.find().exec();
    }
    async findOne(id) {
        try {
            if (!mongoose_3.Types.ObjectId.isValid(id)) {
                throw new common_2.BadRequestException('ID inválido');
            }
            return await this.usuarioModel.findById(id).exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Falha ao encontrar usuário', error.message);
        }
    }
    async update(id, updateUsuarioDto) {
        try {
            const atualizaUsuario = await this.usuarioModel.findOneAndUpdate({ id }, updateUsuarioDto, { new: true }).exec();
            if (!atualizaUsuario) {
                throw new common_1.NotFoundException('Usuario não encontrado');
            }
            return atualizaUsuario;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
        }
    }
    async remove(id) {
        try {
            if (!mongoose_3.Types.ObjectId.isValid(id)) {
                throw new common_2.BadRequestException('ID inválido');
            }
            const result = await this.usuarioModel.findByIdAndDelete(id).exec();
            if (result) {
                return 'Usuário removido com sucesso';
            }
            else {
                throw new common_1.NotFoundException('Usuário não encontrado');
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Falha ao remover usuário', error.message);
        }
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(usuario_schema_1.Usuario.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map