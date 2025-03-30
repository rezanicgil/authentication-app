import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication/authentication.controller';
import { AuthenticationService } from './authentication/authentication.service';
import { UserModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [UserModule, AuthenticationModule],
  controllers: [AuthenticationController, UsersController],
  providers: [AuthenticationService, UsersService],
})
export class AppModule {}
