import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhishingAttempt, PhishingAttemptDocument } from './schemas/phishing.schema';

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(PhishingAttempt.name)
    private phishingModel: Model<PhishingAttemptDocument>,
    private httpService: HttpService,
  ) {}

  async getAll() {
    return this.phishingModel.find().sort({ createdAt: -1 }).exec();
  }

  async createAndSend(email: string) {
    const attempt = await this.phishingModel.create({ email });

    await this.httpService.post('http://localhost:3000/phishing/send', {
      email,
      attemptId: attempt._id,
    }).toPromise();

    return attempt;
  }

  async updateStatus(attemptId: string, status: string) {
    return this.phishingModel.findByIdAndUpdate(
      attemptId,
      { status },
      { new: true }
    );
  }
}
