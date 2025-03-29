import { SignOptions, sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export class JwtUtil {
  static signToken(payload: object, options?: SignOptions): string {
    const secret = process.env.JWT_SECRET as string;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const defaultOptions: SignOptions = {
      expiresIn: process.env.JWT_EXPIRATION
        ? parseInt(process.env.JWT_EXPIRATION)
        : 14400, // Default to 4 hours
    };
    return sign(payload, secret, { ...defaultOptions, ...options });
  }

  static verifyToken<T>(token: string): T {
    const secret = process.env.JWT_SECRET as string;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    try {
      return verify(token, secret) as T;
    } catch {
      throw new Error('Invalid or expired token');
    }
  }
}
