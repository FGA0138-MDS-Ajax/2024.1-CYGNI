// middleware/adminInfo.middleware.ts
import { Injectable, Logger, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ExtrairUsuarioMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) { }

  use(req: Request, res: Response, next: NextFunction) {
    Logger.log(req.headers.authorization); //log do bearer para teste
    try {
      if (!req.headers.authorization) { //verificação de token
        throw new UnauthorizedException('Token de autorização ausente');
      }
      //Logger.log("token existe");
      const token = req.headers.authorization.split(' ')[1]; //elimina o "BEARER" do token
      //Logger.log(token);
      if (!token) {
        throw new UnauthorizedException('Token de autorização ausente'); 
      }

      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET }); //extrai dados especificos do token
      //Logger.log(decoded);
      req['usuario'] = decoded.login; //pega o login do token atual
      req['permissao'] = decoded.privilegios;//pega o privilegio do token atual para verificação e validação
      // Logger.log(decoded.login);
      // Logger.log(decoded.privilegios);
      res.locals.usuario = decoded.login; //response do login para o readonly do front
      res.locals.permissao = decoded.privilegios; //reponse da permissão para o readonly do front
      next();
    } catch (error) { //tratamento de erros do middleware
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