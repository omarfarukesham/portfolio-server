import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

declare module 'sslcommerz-lts' {
  class SSLCommerzPayment {
    constructor(store_id: string, store_passwd: string, is_live: boolean);
    init(data: Record<string, unknown>): Promise<Record<string, unknown>>;
    validate(data: Record<string, unknown>): Promise<Record<string, unknown>>;
  }
  export = SSLCommerzPayment;
}