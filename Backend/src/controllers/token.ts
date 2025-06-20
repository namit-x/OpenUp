import { Response } from 'express';
import { AuthenticatedRequest } from '../controllers/VCControllers'

export const getStoredToken = (req: AuthenticatedRequest, res: Response) => {
  console.log(req.user.id)
};
