import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String, required: true },

    // 🎯 Patient-specific
    dateOfBirth: {
      type: Date,
      required: function (this: any) {
        return this.role === 'patient';
      },
    },

    // 🎯 Therapist-specific
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
      default: function (this: any) {
        return this.role === 'therapist' ? ['CBT'] : undefined;
      },
    },

    experienceYears: {
      type: Number,
      required: function (this: any) {
        return this.role === 'therapist';
      },
      default: function (this: any) {
        return this.role === 'therapist' ? 0 : undefined;
      },
    },

    languages: {
      type: [String],
      required: function (this: any) {
        return this.role === 'therapist';
      },
      default: function (this: any) {
        return this.role === 'therapist' ? ['English'] : undefined;
      },
    },

    gender: { type: String },

    role: {
      type: String,
      enum: ['patient', 'therapist'],
      required: true,
    },

    isVerified: { type: Boolean, default: false },

    // 🌟 Shared fields useful for UI rendering (therapist-focused defaults)
    profilePicUrl: {
      type: String,
      default: '',
    },

    price: {
      type: String,
      default: function (this: any) {
        return this.role === 'therapist' ? '₹1000 for 50 mins' : undefined;
      },
    },

    availableVia: {
      type: [String],
      default: function (this: any) {
        return this.role === 'therapist' ? ['Video'] : undefined;
      },
    },

    nextSlot: {
      type: String,
      default: function (this: any) {
        return this.role === 'therapist' ? 'Tomorrow, 10:00 AM' : undefined;
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
