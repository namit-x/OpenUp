import { Request, Response } from 'express';
import User from '../models/User';
import Session from '../models/Session'

export interface SessionInt {
  patientId: string;
  therapistId: string;
  scheduledTime: string;
  scheduledDay?: string;
  durationMinutes: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

export const bookSession = async (req: Request, res: Response) => {

  function getFormattedDate(input: string): string {
    const today = new Date();
    let targetDate: Date;

    if (input.toLowerCase() === 'today') {
      targetDate = today;
    } else if (input.toLowerCase() === 'tomorrow') {
      targetDate = new Date(today.getTime()); // Clone today
      targetDate.setDate(today.getDate() + 1); // Safe addition
    } else {
      targetDate = new Date(input); // e.g., 'Tue, May 31'
      if (isNaN(targetDate.getTime())) {
        return 'Invalid date input';
      }
    }

    return targetDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  }

  const therapistId = req.body.therapistId;
  // console.log(therapistId);
  let patient = await User.findOne({ phone: req.body.patientPhone })
  const patientId = patient?.id;
  // console.log(patientId);
  const timeSlot = req.body?.selectedSlot;
  const date = getFormattedDate(req.body?.selectedDate);

  let session = await Session.findOne({ therapist: therapistId });
  if (session && session.scheduledTime === timeSlot && session.scheduledDay) {
    res.status(400).send('You already have a appointment scheduled at this time');
  }
  else {
    let newSession = new Session({ therapistId, patientId, scheduledTime: timeSlot, scheduledDay: date, status: 'scheduled' });
    await newSession.save();
    // console.log(`PatientId: ${patientId} booked TherapistID: ${therapistId} on ${date} at ${timeSlot}`);
    res.status(200).send('Session booked successfully.');
  }
}

export const fetchAllSessions = async (id: Object) => {

  console.log("Therapist ID: ", id.toString());
  const sessions: any = await Session.find({ therapistId: id.toString() });
  const response = [];

  for (let i = 0; i < sessions.length; i++) {
    let session = sessions[i]
    const patient: any = await User.findOne({ _id: session.patientId.toString() });
    response.push(patient);
  }
  return response;
}

const isToday = (dateStr: string) => {
  const parsedDate = new Date(`${dateStr}, ${new Date().getFullYear()}`);
  console.log(parsedDate);
  const today = new Date();

  // console.log(parsedDate.getDate(), today.getDate(),
  //   parsedDate.getMonth(), today.getMonth(),
  //   parsedDate.getFullYear(), today.getFullYear())

  return (
    parsedDate.getDate() === today.getDate() &&
    parsedDate.getMonth() === today.getMonth() &&
    parsedDate.getFullYear() === today.getFullYear()
  );
};

export const fetchTodaysSessions = async (req: Request, res: Response) => {
  const phone = req.body.details.phone;
  const therapist: any = await User.findOne({ phone });
  const { _id } = therapist;
  const sessions = await fetchAllSessions(_id);
  let todaySessions = [];
  for (let i = 0; i < sessions.length; i++) {
    if (isToday(sessions[i].scheduledDay)) {
      todaySessions.push(sessions[i]);
    }
  }
  console.log(todaySessions)
  res.json({ fetchTodaysSessions });
}
