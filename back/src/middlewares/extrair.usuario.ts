// middleware/adminInfo.middleware.ts
import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ExtrairUsuarioMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    Logger.log(req.headers.authorization);
    try {
      if (!req.headers.authorization) {
        throw new UnauthorizedException('Token de autorização ausente');
      }
      //Logger.log("token existe");
      const token = req.headers.authorization.split(' ')[1];
      //Logger.log(token);
      if (!token) {
        throw new UnauthorizedException('Token de autorização ausente');
      }
  
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      //Logger.log(decoded);
      req['usuario'] = decoded.login;
      req['permissao'] = decoded.privilegios;
      // Logger.log(decoded.login);
      // Logger.log(decoded.privilegios);
      next();
    } catch (error) {
      if (error.login === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expirado');
      } else if (error.login === 'JsonWebTokenError') {
        throw new UnauthorizedException('Token inválido');
      } else {
        throw new UnauthorizedException('Não autorizado');
      }
    }
  }
}