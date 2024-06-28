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
exports.AdministradoresService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const crypto = require("crypto");
const mongoose_2 = require("mongoose");
const email_services_1 = require("../email/email.services");
const administrador_schema_1 = require("./schemas/administrador.schema");
const tokenDeConfirmacao_schema_1 = require("./schemas/tokenDeConfirmacao.schema");
let AdministradoresService = class AdministradoresService {
    constructor(TokenDeConfirmacaoModel, administradorModel, jwtService, emailService) {
        this.TokenDeConfirmacaoModel = TokenDeConfirmacaoModel;
        this.administradorModel = administradorModel;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async create(CreateAdministradorDto) {
        const newAdmin = new this.administradorModel(CreateAdministradorDto);
        return await newAdmin.save();
    }
    async findAll() {
        return await this.administradorModel.find().exec();
    }
    async login({ login, senha }) {
        try {
            const administrador = await this.administradorModel.findOne({ login }).exec();
            if (!administrador)
                throw new common_1.ForbiddenException('usuário não existe ou senha inválida');
            if (senha !== administrador.senha)
                throw new common_1.ForbiddenException('usuário não existe ou senha inválida');
            const token = this.jwtService.sign({
                login: administrador.login,
                privilegios: administrador.privilegios
            }, {
                secret: process.env.JWT_SECRET
            });
            return token;
        }
        catch (error) {
            common_1.Logger.log(error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException('ID inválido');
            }
            return await this.administradorModel.findById(id).exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Falha ao encontrar administrador', error.message);
        }
    }
    async update(id, updateAdministradorDto) {
        try {
            const atualizaAdministrador = await this.administradorModel.findOneAndUpdate({ _id: id }, updateAdministradorDto, { new: true }).exec();
            if (!atualizaAdministrador) {
                throw new common_1.NotFoundException('Administrador não encontrado');
            }
            return atualizaAdministrador;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
        }
    }
    async remove(id) {
        try {
            if (!mongoose_2.Types.ObjectId.isValid(id)) {
                throw new common_1.BadRequestException('ID inválido');
            }
            const result = await this.administradorModel.findByIdAndDelete(id).exec();
            if (result) {
                return 'Administrador removido com sucesso';
            }
            else {
                throw new common_1.NotFoundException('Administrador não encontrado');
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Falha ao remover administrador', error.message);
        }
    }
    async enviaTokenRedefinirSenha(email) {
        try {
            common_1.Logger.log("início da função");
            const usuario = await this.administradorModel.findOne({ email });
            if (!usuario) {
                throw new common_1.NotFoundException("Usuario nao encontrado");
            }
            common_1.Logger.log(usuario, email);
            const token = crypto.randomBytes(3).toString('hex');
            common_1.Logger.log(token);
            await new this.TokenDeConfirmacaoModel({
                email: email,
                token
            }).save();
            common_1.Logger.log("token salvo");
            const text = `Seu código de redefinição de senha é: ${token}`;
            const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <p>Olá,</p>
        <p>Você solicitou a redefinição de senha. Use o código abaixo para redefinir sua senha:</p>
        <h2 style="color: blue; background-color: #f0f0f0; padding: 10px; display: inline-block;">${token}</h2>
        <p>Se você não solicitou a redefinição de senha, por favor, ignore este email.</p>
        <p>Obrigado,</p>
        <p><strong>Equipe AGIS</strong></p>
        <hr>
        <p style="font-size: 0.9em; color: #888;">Este é um email automático, por favor, não responda.</p>
      </div>
    `;
            await this.emailService.enviaEmail(usuario.email, "Redefinição de senha AGIS", text, html);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
        }
    }
    async verificaToken(email, token) {
        try {
            const confirmaToken = await this.TokenDeConfirmacaoModel.findOne({ email, token });
            if (!confirmaToken) {
                throw new common_1.NotFoundException('Token Invalido');
            }
            return true;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
        }
    }
    async redefineSenha({ email, novaSenha, novaSenhaConfirmacao, token }) {
        try {
            if (novaSenha !== novaSenhaConfirmacao)
                throw new common_1.BadRequestException;
            const tokenValidado = await this.verificaToken(email, token);
            if (!tokenValidado) {
                throw new common_1.NotFoundException('Token inválido ou expirado');
            }
            const usuario = await this.administradorModel.findOne({ email });
            if (!usuario) {
                throw new common_1.NotFoundException('Usuário não encontrado');
            }
            usuario.senha = novaSenha;
            await usuario.save();
            await this.TokenDeConfirmacaoModel.deleteOne({ email, token });
            return 'Senha Alterada';
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
        }
    }
    async findAllTokens() {
        return this.TokenDeConfirmacaoModel.find().exec();
    }
};
exports.AdministradoresService = AdministradoresService;
exports.AdministradoresService = AdministradoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tokenDeConfirmacao_schema_1.TokenDeConfirmacao.name)),
    __param(1, (0, mongoose_1.InjectModel)(administrador_schema_1.Administrador.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        email_services_1.EmailService])
], AdministradoresService);
//# sourceMappingURL=administradores.service.js.map