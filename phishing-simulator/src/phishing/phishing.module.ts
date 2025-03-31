import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { PhishingController } from './phishing.controller';
import { PhishingService } from './phishing.service';
import { PhishingAttempt, PhishingAttemptSchema } from './schemas/phishing.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingAttemptSchema },
    ]),
  ],
  controllers: [PhishingController],
  providers: [PhishingService],
})
export class PhishingModule {}
