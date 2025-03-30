import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { plainToInstance } from 'class-transformer';
import { validateDto } from '../utils/validation.util';
import { JwtUtil } from '../utils/jwt.util';

@Injectable()
export class AuthenticationService {
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const loginValidationDto = plainToInstance(LoginDto, loginDto);

    await validateDto(loginValidationDto);

    const user = {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
    };

    if (email !== user.email || password !== user.password) {
      throw new Error('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    const token = JwtUtil.signToken(payload);

    return {
      accessToken: token,
    };
  }
}
