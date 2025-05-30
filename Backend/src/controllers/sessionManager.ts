import { Request, Response } from 'express';
import User from '../models/User';
import Session from '../models/Session'

export const bookSession = async(req: Request, res: Response) => {

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
  let patient = await User.findOne({phone: req.body.patientPhone})
  const patientId = patient?.id;
  // console.log(patientId);
  const timeSlot = req.body?.selectedSlot;
  const date = getFormattedDate(req.body?.selectedDate);

  let session = await Session.findOne({therapist: therapistId});
  if (session && session.scheduledTime === timeSlot && session.scheduledDay) {
    res.status(400).send('You already have a appointment scheduled at this time');
  }
  else {
    let newSession = new Session({therapistId, patientId, scheduledTime: timeSlot, scheduledDay: date, status: 'scheduled'});
    await newSession.save();
    // console.log(`PatientId: ${patientId} booked TherapistID: ${therapistId} on ${date} at ${timeSlot}`);
    res.status(200).send('Session booked successfully.');
  }
}

export const fetchSessions = async(req: Request, res: Response) => {
  const phone = req.body.details.phone;
  console.log(req.body.details);
  const therapist: any = await User.findOne({phone});
  const {_id} = therapist;
  console.log("Therapist ID: ", _id.toString());
  const sessions: any = await Session.find({therapistId: _id.toString()});
  const response = [];
  // console.log(sessions);
  for (let i = 0; i < sessions.length; i++) {
    let session = sessions[i]
    const patient: any = await User.findOne({_id: session.patientId.toString()});
    let obj = {name: patient.fullName, time: session.scheduledTime, type: "Video"};
    response.push(obj);
  }
  console.log("Response: ", response);

  // patient name, time, type(video, audio)
  res.json({message: "wait bhai"});
}
