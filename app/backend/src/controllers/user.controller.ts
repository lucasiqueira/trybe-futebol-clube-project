import { Request, Response } from 'express';
import { UserService } from '../services';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async login(req: Request, res: Response) {
    const loginData = req.body;
    const { status, data } = await this.userService.login(loginData);
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async getRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { status, data } = await this.userService.getRole(authorization as string);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
