import { Module } from '@nestjs/common';
import { AuthController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthenticationService],
})
export class AppModule {}
