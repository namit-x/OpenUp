import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  therapist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scheduledTime: { type: Date, required: true },
  durationMinutes: { type: Number, default: 60 },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  // meetingLink: { type: String }, // for online sessions (Zoom/Meet/etc)
}, { timestamps: true });

export default mongoose.model('Session', sessionSchema);
