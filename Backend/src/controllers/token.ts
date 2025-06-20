import { Response } from 'express';
import { AuthenticatedRequest } from '../controllers/VCControllers'
import { getToken } from './tokenStorage'

export const getStoredToken = async (req: AuthenticatedRequest, res: Response) => {
  let data = await getToken(req.user.id)
  res.status(201).json({data: data});
};
