import { jwtDecode } from 'jwt-decode';
import { UserEntity } from '../../../entities/user';
import { Logger } from '../../../shared/logger/logger';
import { RequestContext } from './request-context';
import { Request } from 'express';

export class RequestContextMiddlewareHandler {
  private static HEADER_AUTHORIZATION_TOKEN = 'authorization';

  public static shouldBuildContext(req: Request): boolean {
    const path = (req.originalUrl ?? req.url ?? '').split('?')[0];
    const isLogin = req.method === 'POST' && /\/auth\/login\/?$/.test(path);
    return !isLogin;
  }

  public static handle(req: Request): RequestContext {
    const authorizationToken = this.getAuthorizationToken(req);
    const loggedUserInfo = this.getLoggedUserInfo(authorizationToken);

    return new RequestContext({
      user: loggedUserInfo,
    });
  }

  private static getAuthorizationToken(req: Request): string {
    const token = req.headers[
      RequestContextMiddlewareHandler.HEADER_AUTHORIZATION_TOKEN
    ] as string;

    if (!token) {
      throw new Error('No authorization token provided');
    }

    return token;
  }

  private static getLoggedUserInfo(authorizationToken?: string): UserEntity {
    let parsedLoggedUserInfo: UserEntity;

    if (!authorizationToken) {
      throw new Error('No authorization token provided');
    }

    try {
      parsedLoggedUserInfo = this.parseToken(authorizationToken);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      Logger.error(
        `[RequestContextMiddlewareHandler] Error parsing authentication token. Details: ${errorMessage}`,
      );
      throw new Error(
        `Error parsing authentication token. Details: ${errorMessage}`,
      );
    }

    return parsedLoggedUserInfo;
  }

  private static parseToken(authToken: string): UserEntity {
    if (authToken == null) {
      throw new Error("Can't parse null authToken");
    }

    try {
      const token: string = authToken.replace('Bearer ', '');
      const decodedToken = jwtDecode<UserEntity>(token);

      return {
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
      } as UserEntity;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      Logger.error(
        `[RequestContextMiddlewareHandler] Error decoding authentication token. Details: ${errorMessage}`,
      );
      throw new Error(
        `Error decoding authentication token. Details: ${errorMessage}`,
      );
    }
  }
}
