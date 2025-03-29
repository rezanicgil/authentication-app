import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { validateDto } from '../utils/validation.util'; // Import the validation utility
import { handleValidationError } from '../utils/validation.util';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
    this.logger.log(`Login attempt for email: ${loginDto.email}`);

    try {
      await validateDto(loginDto);

      const result = await this.authService.login(loginDto);
      this.logger.log(`Login successful for email: ${loginDto.email}`);
      return result;
    } catch (error) {
      this.logger.error(
        `Login failed for email: ${loginDto.email}`,
        error.stack,
      );

      handleValidationError(error, this.logger, { ...loginDto });

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
