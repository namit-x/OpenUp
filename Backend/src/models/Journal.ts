// models/Journal.ts
import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Journal', journalSchema);
