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
exports.ExtrairUsuarioMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let ExtrairUsuarioMiddleware = class ExtrairUsuarioMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    use(req, res, next) {
        common_1.Logger.log(req.headers.authorization);
        try {
            if (!req.headers.authorization) {
                throw new common_1.UnauthorizedException('Token de autorização ausente');
            }
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                throw new common_1.UnauthorizedException('Token de autorização ausente');
            }
            const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            req['usuario'] = decoded.login;
            next();
        }
        catch (error) {
            if (error.login === 'TokenExpiredError') {
                throw new common_1.UnauthorizedException('Token expirado');
            }
            else if (error.login === 'JsonWebTokenError') {
                throw new common_1.UnauthorizedException('Token inválido');
            }
            else {
                throw new common_1.UnauthorizedException('Não autorizado');
            }
        }
    }
};
exports.ExtrairUsuarioMiddleware = ExtrairUsuarioMiddleware;
exports.ExtrairUsuarioMiddleware = ExtrairUsuarioMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], ExtrairUsuarioMiddleware);
//# sourceMappingURL=extrair.usuario.js.map