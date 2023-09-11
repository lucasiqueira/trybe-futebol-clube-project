import { sign, verify } from 'jsonwebtoken';
import { Payload } from '../types/Payload';

export default class JWT {
  private static _secret: string = process.env.JWT_SECRET || 'secret';

  static createToken(payload: Payload): string {
    return sign(payload, JWT._secret);
  }

  static verifyToken(bearer: string): Payload | null {
    try {
      const token = bearer.split(' ')[1] || bearer;
      return verify(token, JWT._secret) as Payload;
    } catch (error) {
      return null;
    }
  }
}
