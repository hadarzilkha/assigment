import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PhishingModule } from './phishing/phishing.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule, UsersModule, PhishingModule, MongooseModule.forRoot('mongodb://localhost/phishing-app')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
