import { Request, Router, Response } from 'express';
import { MatchController } from '../controllers';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.patchMatch(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchController.patchGoals(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  Validations.validateMatch,
  (req: Request, res: Response) => matchController.createMatch(req, res),
);

export default router;
