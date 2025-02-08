import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ROLES_KEY } from './roles-decorator';
import { RoleType } from 'src/entities/user/types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const { user } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (requiredRoles.includes(user.role)) {
        request['requestUser'] = user;
      } else {
        throw new UnauthorizedException();
      }
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
