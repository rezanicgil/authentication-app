import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthenticationService } from './auth/authentication.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthenticationService],
})
export class AppModule {}
