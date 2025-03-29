import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;
    console.log(`Logging in user with email: ${email} and password: ${password}`);
    return {
      access_token: 'dummy-token',
    };
  }
}
