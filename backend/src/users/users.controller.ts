import {
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Get,
  Req,
} from '@nestjs/common';
import { JwtUtil } from 'src/utils/jwt.util';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  @Get('info')
  async info(@Req() req: Request): Promise<{ email: string; userId: string }> {
    try {
      const token =
        req.headers['authorization'] &&
        req.headers['authorization'].startsWith('Bearer ')
          ? req.headers['authorization'].split(' ')[1]
          : null;
      if (!token) {
        throw new HttpException('Token not provided', HttpStatus.UNAUTHORIZED);
      }
      interface JwtPayload {
        email: string;
        sub: string;
      }

      const payload = JwtUtil.verifyToken(token) as JwtPayload;
      if (!payload) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }

      return { email: payload.email, userId: payload.sub };
    } catch (error: unknown) {
      this.logger.warn(`Failed to retrieve user info: ${error}`);
      throw new HttpException(
        'Invalid or expired token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
