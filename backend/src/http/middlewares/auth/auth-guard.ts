import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from './roles-decorator';
import { RoleType } from 'src/entities/user/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Cria o contexto do GraphQL
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext(); // Extrai o objeto `req` do contexto GraphQL

    const token = this.extractTokenFromHeader(req); // Extrai o token do cabeçalho

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      // Verifica o token JWT
      const payload = await this.jwtService.verify(token);

      // Obtém as roles necessárias a partir do decorator
      const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      // Verifica se o usuário tem a role necessária
      if (requiredRoles && !requiredRoles.includes(payload.user.role)) {
        throw new UnauthorizedException('Insufficient permissions');
      }

      // Adiciona o usuário ao contexto da requisição
      req['user'] = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
