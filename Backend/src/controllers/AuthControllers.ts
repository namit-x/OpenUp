import { Request, Response } from "express";
import User from "../models/User";
import argon2 from 'argon2';
import { patientSignupSchema, therapistSignupSchema } from "../validators/SignupSchema";
import jwt from 'jsonwebtoken';

export interface IPatientSignup {
  fullName: string;
  mobile: string;
  password: string;
  dateOfBirth: string; // use string if coming from input type="date"
  email?: string;
  profilePicUrl?: string;
  gender?: string;
  timeZone?: string;
}

export interface ITherapistSignup {
  fullName: string;
  mobile: string;
  password: string;
  licenseNumber: string;
  specializations: string[];
  experienceYears: number;
  languages: string[];
  email?: string;
  profilePicUrl?: string;
  gender?: string;
  timeZone?: string;
}

interface loginData {
  password: string,
  phone: string,
  role: string,
}

export const signup = async (req: Request, res: Response) => {
  if (!req) {
    res.status(400).json({ message: "Request body not valid" });
    return;
  }

  const schema = req.body.role === 'therapist' ? therapistSignupSchema : patientSignupSchema;

  let validatedData = schema.parse(req.body);
  let exists = await User.findOne({ phone: validatedData.phone })

  if (exists !== null) {
    console.log("400 from customer column");
    res.status(400).json({ message: "Entry already exists." });
    return;
  }
  else {
    // Hash password before saving
    // await Customer.deleteMany({});
    validatedData.password = await argon2.hash(validatedData.password);

    let newUser = new User(validatedData);
    await newUser.save();

    res.status(201).json({ message: "Operation Successful" });
    return;
  };
}

export const login = async (req: Request, res: Response) => {
  const data: loginData = req.body;
  console.log("Data received: ", data);

  let exists = await User.findOne({ phone: data.phone, role: data.role }).exec();

  if (exists === null) {
    console.log(`Account doesn't exists: ${exists}`);
    res.status(400).json({
      message: "Account doesn't exists.",
    });
  }
  else {
    const isMatch: Boolean = await argon2.verify(data.password, exists.password);

    if (isMatch) {
      const payload = {
        phone: data.phone,
        role: data.role,
      }
      const secretKey = process.env.Secret_Key as string;
      const token = jwt.sign(payload, secretKey, { expiresIn: "15D" });

      res.cookie('AuthToken', token, {
        httpOnly: false,
        secure: false,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      })

      res.status(201).json({
        message: "Verified",
        userData: exists,
      });
    }
    else {
      res.status(400).json({ message: "Not Authorized" });
    }
  }
}