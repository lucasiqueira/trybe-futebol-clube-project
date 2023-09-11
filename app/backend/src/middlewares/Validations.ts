import { Request, NextFunction, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import jwt from '../utils/JWT';

export default class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(mapStatusHTTP('INVALID_DATA'))
        .json({ message: 'All fields must be filled' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Invalid email or password' });
    }

    if (password.length < 6) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Token not found' });
    }

    const payload = jwt.verifyToken(authorization);

    if (!payload) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Token must be a valid token' });
    }

    next();
  }

  static validateMatch(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body;

    if (homeTeamId === awayTeamId) {
      return res.status(mapStatusHTTP('UNPROCESSABLE_ENTITY'))
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    next();
  }
}
