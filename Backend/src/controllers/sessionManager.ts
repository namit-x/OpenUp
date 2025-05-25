import { Request, Response } from 'express';
import User from '../models/User';

export const bookSession = async(req: Request, res: Response) => {

  const therapistId = req.body.therapistId;
  let patient = await User.findOne({phone: req.body.patientPhone})
  const patientId = patient?.id;

  console.log(`TherapistID: ${therapistId} PatientPhone: ${patientId}`);
  res.send('Received')
}
