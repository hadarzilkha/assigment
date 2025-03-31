import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.phishingService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  send(@Body() body: { email: string }) {
    return this.phishingService.createAndSend(body.email);
  }

  @Post('update')
  updateStatus(@Body() body: { attemptId: string; status: string }) {
    return this.phishingService.updateStatus(body.attemptId, body.status);
  }
}
