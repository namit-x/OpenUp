import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response as ExpressResponse } from 'express';

dotenv.config();
const managementToken = process.env.Management_Token;
const templateId = process.env.Template_Id;

export interface AuthenticatedRequest extends Request {
  user?: any;
  body: {
    pid?: string;
    [key: string]: any;
  };
}

export const createRoom = async (req: AuthenticatedRequest, res: ExpressResponse) => {
  try {
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
      return res.status(response.status).json({ error: errorText });
    }

    const data: any = await response.json();

    let patientToken = await generateUserToken(data.id, req.body?.pid ?? '', 'patient');
    let therapistToken = await generateUserToken(data.id, req.user.id, req.user.role);
    console.log('patient token: ', patientToken);
    console.log('therapist token: ', therapistToken);
    return res.status(201).json({ therapistToken, roomId: data.id });

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
