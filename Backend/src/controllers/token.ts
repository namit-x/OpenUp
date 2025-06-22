import { Response } from 'express';
import { AuthenticatedRequest } from '../controllers/VCControllers'
import { getToken } from './tokenStorage'

export const getStoredToken = async (req: AuthenticatedRequest, res: Response) => {
  let data = await getToken(req.user.id)
  if (data === undefined) {
    return res.status(201).json({message: "The meeting is not initiated by your therapist yet."});
  }
  return res.status(201).json({data: data, message: "Joining meeting"});
};
