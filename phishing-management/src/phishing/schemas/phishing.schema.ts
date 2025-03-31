import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhishingAttemptDocument = PhishingAttempt & Document;

@Schema({ timestamps: true })
export class PhishingAttempt {
  @Prop({ required: true })
  email: string;

  @Prop({ default: 'pending' }) // אפשר גם 'clicked', 'sent'
  status: string;

  @Prop()
  content?: string;
}

export const PhishingAttemptSchema = SchemaFactory.createForClass(PhishingAttempt);
