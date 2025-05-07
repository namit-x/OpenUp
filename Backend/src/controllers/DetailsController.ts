import { Request, Response } from 'express';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: any; // Adding a custom 'user' field
}

export const details = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user === null) {
      res.status(200).json({ message: "Token unavailable" });
      return;
    }

    let userData= await User.findOne({ phone: req.user.phone });

    res.status(200).json({name: userData?.fullName, phone: userData?.phone});
    return;
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
