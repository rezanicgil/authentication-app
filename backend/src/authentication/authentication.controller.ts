import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Logger,
  Req,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
  ): Promise<{ access_token: string }> {
    const ip = req.ip;
    const maskedEmail = loginDto.email.replace(/(.{2}).+(@.+)/, '$1***$2');
    this.logger.log(`Login attempt for email: ${maskedEmail} from IP: ${ip}`);

    try {
      const result = await this.authService.login(loginDto);
      this.logger.log(
        `Login successful for email: ${maskedEmail} from IP: ${ip}`,
      );
      return result;
    } catch (error) {
      this.logger.warn(
        `Failed login attempt for email: ${maskedEmail} from IP: ${ip}`,
      );
      if (error.message === 'Invalid credentials') {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(
        'An unexpected error occurred. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
