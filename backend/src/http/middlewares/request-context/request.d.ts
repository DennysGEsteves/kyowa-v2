import { UserEntity } from 'src/entities';

declare global {
  namespace Express {
    export interface Request {
      context?: RequestContext;
    }
  }
  export interface Request {
    requestUser?: UserEntity;
    baseUrl?: string;
    originalUrl?: string;
  }
}
