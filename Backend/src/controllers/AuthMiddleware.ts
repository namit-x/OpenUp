import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.TAuthToken || req.cookies?.PAuthToken;

  if (!token) {
    res.status(403).json({ error: "cookie not found" });
    return;
  }

  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error("SECRET_KEY is not defined in environment variables");
  }

  jwt.verify(token, secretKey, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
    if (err) {
      res.status(403).json({ error: "Invalid token" });
      return;
    }

    req.user = decoded;
    next();
  });
};
