import { Request, Response } from 'express';
import User from '../models/User';

export const bookSession = async(req: Request, res: Response) => {

  const therapistId = req.body.therapistId;
  let patient = await User.findOne({phone: req.body.patientPhone})
  const patientId = patient?.id;
  const timeSlot = req.body?.selectedSlot;
  const date = req.body?.selectedDate;

  console.log(`PatientId: ${patientId} booked TherapistID: ${therapistId} on ${date} at ${timeSlot}`);
  res.status(200).send('Session booked successfully.');
}
