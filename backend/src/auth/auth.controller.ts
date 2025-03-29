import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  


  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    this.logger.log(`Login attempt for email: ${loginDto.email}`);

    try {
      const result = await this.authService.login(loginDto);
      this.logger.log(`Login successful for email: ${loginDto.email}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Login failed for email: ${loginDto.email}`,
        error.stack,
      );

      if (error.message.startsWith('Validation failed')) {
        this.logger.warn(`Validation error for email: ${loginDto.email}`);
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      if (error.message === 'Invalid credentials') {
        this.logger.warn(`Invalid credentials for email: ${loginDto.email}`);
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.UNAUTHORIZED,
        );
      }

      this.logger.error(
        `Unexpected error during login for email: ${loginDto.email}`,
        error.stack,
      );
      throw new HttpException(
        'An unexpected error occurred. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
