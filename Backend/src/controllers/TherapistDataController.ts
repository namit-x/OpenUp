import { Request, Response } from 'express';
import User from '../models/User';

export const therapistData = async (req:Request, res: Response) => {
  let fetchedData = await User.find({role: "therapist"});

  res.json({fetchedData});
}
