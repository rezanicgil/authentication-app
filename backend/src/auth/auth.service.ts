import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { sign, SignOptions } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

dotenv.config();

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    const loginValidationDto = plainToInstance(LoginDto, loginDto); // Use LoginDto directly
    const errors = await validate(loginValidationDto);

    if (errors.length > 0) {
      throw new Error(
        'Validation failed: ' +
          errors
            .map((err) => Object.values(err.constraints || {}).join(', '))
            .join('; '),
      );
    }

    const user = {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
    };

    if (email !== user.email || password !== user.password) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const secret = process.env.JWT_SECRET as string;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }
    const options: SignOptions = {
      expiresIn: process.env.JWT_EXPIRATION
        ? parseInt(process.env.JWT_EXPIRATION, 10)
        : '1h',
    };
    const token = sign(payload, secret, options);

    return {
      access_token: token,
    };
  }
}
