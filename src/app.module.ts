import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModules } from './Users/users.module';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [
    UsersModules,
    AuthModule
  ],
  controllers: [

  ],
  providers: [

  ],
})
export class AppModule {}
