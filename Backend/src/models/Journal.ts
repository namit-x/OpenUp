// models/Journal.ts
import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  content: { type: String },
  pdfUrl: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Journal', journalSchema);
