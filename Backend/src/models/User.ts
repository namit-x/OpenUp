import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true, unique: true }, // Unique primary identifier
  email: { type: String }, // Optional now
  password: { type: String, required: true },

  dateOfBirth: {
    type: Date,
    required: function (this: any) {
      return this.role === 'patient';
    },
  },

  licenseNumber: {
    type: String,
    required: function (this: any) {
      return this.role === 'therapist';
    },
  },

  specializations: {
    type: [String],
    required: function (this: any) {
      return this.role === 'therapist';
    },
  },

  experienceYears: {
    type: Number,
    required: function (this: any) {
      return this.role === 'therapist';
    },
  },

  languages: {
    type: [String],
    required: function (this: any) {
      return this.role === 'therapist';
    },
  },
  gender: { type: String },
  role: {
    type: String,
    enum: ['patient', 'therapist'],
    required: true,
  },
  isVerified: { type: Boolean, default: false },
  profilePicUrl: { type: String },
},
{
  timestamps: true,
});

export default mongoose.model('User', userSchema);
