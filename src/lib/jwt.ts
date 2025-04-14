import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
import { Types } from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JWTPayload {
  id: string;
  email: string;
  name: string;
}

export const generateToken = (user: IUser & { _id: Types.ObjectId }) => {
  return jwt.sign(
    {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
    },
    JWT_SECRET,
    {
      expiresIn: '7d',
    }
  );
};

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}; 