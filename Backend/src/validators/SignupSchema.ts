import { z } from "zod";

export const patientSignupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(10, "Mobile number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Invalid email").optional(),
  profilePicUrl: z.string().url("Invalid URL").optional(),
  gender: z.string().optional(),
  role: z.literal("patient"),
});

export const therapistSignupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(10, "Mobile number must be at least 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  licenseNumber: z.string().min(1, "License number is required"),
  specializations: z.array(z.string()).min(1, "At least one specialization is required"),
  experienceYears: z.number().min(0, "Experience must be a positive number"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  email: z.string().email("Invalid email").optional(),
  profilePicUrl: z.string().url("Invalid URL").optional(),
  gender: z.string().optional(),
  role: z.literal("therapist"),
});
