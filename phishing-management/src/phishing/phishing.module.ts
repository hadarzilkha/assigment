import { Module  } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingAttempt, PhishingAttemptSchema } from './schemas/phishing.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PhishingAttempt.name, schema: PhishingAttemptSchema }]),
    HttpModule,
  ],
  providers: [PhishingService],
  controllers: [PhishingController]
})
export class PhishingModule {}
