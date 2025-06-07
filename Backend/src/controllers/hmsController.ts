import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const ACCESS_KEY = process.env.HMS_ACCESS_KEY!;
const SECRET = process.env.HMS_SECRET!;
const TOKEN_VALIDITY_SEC = 60 * 60; // 1 hour

export const generateVCToken = (req: Request, res: Response) => {
  try {
    const { user_id, role, room_id } = req.body;

    if (!user_id || !role || !room_id) {
      return res.status(400).json({ message: 'user_id, role, and room_id are required.' });
    }

    const now = Math.floor(Date.now() / 1000);
    const payload = {
      access_key: ACCESS_KEY,
      room_id,
      user_id,
      role,
      type: 'app',
      version: 2,
      iat: now,
      nbf: now,
      exp: now + TOKEN_VALIDITY_SEC,
      jti: uuidv4()
    };

    const token = jwt.sign(payload, SECRET, { algorithm: 'HS256' });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating VC token:', error);
    return res.status(500).json({ message: 'Failed to generate VC token.' });
  }
};
