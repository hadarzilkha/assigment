import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PhishingAttempt, PhishingAttemptDocument } from './schemas/phishing.schema';
import { Model } from 'mongoose';

@Injectable()
export class PhishingService {
  constructor(
    @InjectModel(PhishingAttempt.name) private phishingModel: Model<PhishingAttemptDocument>,
  ) {}

  async getAll() {
    return this.phishingModel.find().sort({ createdAt: -1 }).exec();
  }

  async createAndSend(email: string) {
    const attempt = await this.phishingModel.create({ email });
    // בקוד הקודם – שליחה לשרת הסימולציה...
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
