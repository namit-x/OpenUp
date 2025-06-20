import { Request, Response } from 'express';
import User from '../models/User';
import Session from '../models/Session'
import { AuthenticatedRequest } from '../controllers/VCControllers'

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
  let patient = await User.findOne({ phone: req.body.patientPhone })
  const patientId = patient?.id;

  const timeSlot = req.body?.selectedSlot;
  const date = getFormattedDate(req.body?.selectedDate);

  let session = await Session.findOne({ therapist: therapistId });
  if (session && session.scheduledTime === timeSlot && session.scheduledDay) {
    res.status(400).send('You already have a appointment scheduled at this time');
  }
  else {
    let newSession = new Session({ therapistId, patientId, scheduledTime: timeSlot, scheduledDay: date, status: 'scheduled' });
    await newSession.save();

    res.status(200).send('Session booked successfully.');
  }
}

export const fetchAllSessions = async (id: Object) => {

  const sessions: any = await Session.find({ therapistId: id.toString() });
  return sessions;
}

const isToday = (dateStr: string) => {
  // Remove comma and split the string
  const cleanStr = dateStr.replace(',', '');
  const [_, monthName, dayStr] = cleanStr.split(' ');
  const day = parseInt(dayStr, 10);
  const year = new Date().getFullYear();

  // Map for month abbreviation to index
  const monthMap: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };

  const month = monthMap[monthName];
  if (month === undefined || isNaN(day)) return false;

  // Create date at midnight local time (avoids UTC issues)
  const parsedDate = new Date(year, month, day);
  const today = new Date();

  return (
    parsedDate.getFullYear() === today.getFullYear() &&
    parsedDate.getMonth() === today.getMonth() &&
    parsedDate.getDate() === today.getDate()
  );
};

export const fetchTodaysSessions = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.user.id;
  const sessions = await fetchAllSessions(id);
  let todaySessions = [];
  for (let i = 0; i < sessions.length; i++) {
    if (isToday(sessions[i].scheduledDay)) {
      todaySessions.push(sessions[i]);
    }
  }
  let todaySessionsObj = [];

  for (let i = 0; i < todaySessions.length; i++) {
    let id = todaySessions[i].patientId.toString();
    let patient = await User.findOne({_id:id});
    todaySessionsObj.push({name: patient?.fullName, patientID: id, time: todaySessions[i].scheduledTime, type: 'Video'})
  }
  res.json({todaySessionsObj});
}

export const fetchPatientSessions = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = req.user.id;

    // Fetch all sessions for the patient
    const sessions = await Session.find({ patientId: id });

    // Prepare Meeting objects
    const meetingPromises = sessions.map(async (session) => {
      const therapist = await User.findById(session.therapistId);

      return {
        id: session._id.toString(),
        therapistName: therapist?.fullName || '',
        date: session.scheduledDay,
        time: session.scheduledTime,
        type: therapist?.availableVia?.[0] === 'Voice' ? 'Voice' : 'Video'
      };
    });

    const meetings = await Promise.all(meetingPromises);
    res.status(200).json({ meetings });

  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
