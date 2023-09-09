import { sign, verify } from 'jsonwebtoken';
import { Payload } from '../types/Payload';

export default class JWT {
  private _secret: string = process.env.JWT_SECRET || 'secret';

  createToken(payload: Payload): string {
    return sign(payload, this._secret);
  }

  verifyToken(token: string): Payload | null {
    try {
      return verify(token, this._secret) as Payload;
    } catch (error) {
      return null;
    }
  }
}
