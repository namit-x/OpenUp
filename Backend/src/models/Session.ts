import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scheduledTime: { type: String, required: true },
  scheduledDay: { type: String }, // e.g., 'Monday' (optional helper)
  durationMinutes: { type: Number, required: true, default: 60 },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
}, { timestamps: true });

export default mongoose.model('Session', sessionSchema);
