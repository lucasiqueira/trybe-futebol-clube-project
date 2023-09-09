import { Request, Router, Response } from 'express';
import { MatchController } from '../controllers';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

export default router;
