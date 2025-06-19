import { Request, Response } from 'express';

export const getStoredToken = (req: Request, res: Response) => {
  const token = req.cookies['vc_token'];
  if (!token) return res.status(401).json({ message: 'Token expired or missing' });
  return res.status(200).json({ token });
};