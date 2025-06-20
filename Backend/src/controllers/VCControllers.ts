import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response as ExpressResponse } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { storeToken } from '../controllers/tokenStorage'

dotenv.config();
const templateId = process.env.Template_Id;

export interface AuthenticatedRequest extends Request {
  user?: any;
  body: {
    pid?: string;
    [key: string]: any;
  };
}

const generateManagementToken = () => {
  if (!process.env.HMS_ACCESS_KEY || !process.env.HMS_SECRET) {
    throw new Error('Missing HMS_ACCESS_KEY or HMS_SECRET in environment');
  }

  const payload = {
    access_key: process.env.HMS_ACCESS_KEY,
    type: 'management',
    version: 2,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour expiry
    jti: uuidv4(), // unique JWT ID
  };

  return jwt.sign(payload, process.env.HMS_SECRET);
};

export const createRoom = async (req: AuthenticatedRequest, res: ExpressResponse) => {
  try {
    const managementToken = generateManagementToken();
    const response = await fetch('https://api.100ms.live/v2/rooms', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${managementToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `openup-session-${Date.now()}`,
        description: 'Therapy session room',
        template_id: templateId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("from create room: ", errorText);
      return res.status(response.status).json({ error: errorText });
    }
    const data: any = await response.json();

    let patientToken = await generateUserToken(data.id, req.body?.pid ?? '', 'patient');
    await storeToken(req.body.pid ?? '', patientToken);
    
    let therapistToken = await generateUserToken(data.id, req.user.id, req.user.role);
    await storeToken(req.user.id ?? '', therapistToken);

  } catch (error) {
    console.error('❌ Error creating room:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const generateUserToken = (
  roomId: string,
  userId: string,
  role: string,
): string => {
  if (!userId || !roomId || !role) {
    throw new Error('Invalid details, token can\'t be generated.');
  }
  const ACCESS_KEY = process.env.HMS_ACCESS_KEY;
  const SECRET_KEY = process.env.HMS_SECRET;

  if (!ACCESS_KEY || !SECRET_KEY) {
    throw new Error('HMS_ACCESS_KEY or HMS_SECRET is not defined in .env');
  }

  const payload = {
    access_key: ACCESS_KEY,
    room_id: roomId,
    user_id: userId,
    role: role,
    type: 'app',
    version: 2,
  };

  const options: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '1h',
    issuer: ACCESS_KEY,
    audience: 'https://api.100ms.live/v2',
  };

  const token = jwt.sign(payload, SECRET_KEY, options);
  return token;
};
