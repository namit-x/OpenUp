import { Request, Response } from 'express';
import User from '../models/User.js';

export const therapistData = async (_req:Request, res: Response) => {
  let fetchedData = await User.find({role: "therapist"});

  res.json({fetchedData});
}
