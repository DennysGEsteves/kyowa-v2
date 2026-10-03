import { RequestContext } from 'src/http/middlewares/request/request-context';

declare global {
  namespace Express {
    export interface Request {
      user?: RequestContext;
    }
  }
  export interface Request {
    user?: RequestContext;
  }
}
