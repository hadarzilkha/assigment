import { Controller, Get, Post, Param, Res, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Response } from 'express';
import * as nodemailer from 'nodemailer';

@Controller('phishing')
export class PhishingController {
  constructor(private readonly httpService: HttpService) {}

  // שליחת מייל פישינג
  @Post('send')
  async sendEmail(@Body() body: { email: string; attemptId: string }) {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const phishingLink = `http://localhost:3000/phishing/click/${body.attemptId}`;

    const info = await transporter.sendMail({
      from: '"Phishing Bot" <phishing@test.com>',
      to: body.email,
      subject: '⚠️ Urgent: Security Alert!',
      html: `
        <p>We detected unusual activity on your account.</p>
        <p>Please <a href="${phishingLink}">click here</a> to verify your identity.</p>
      `,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);
    console.log(`📬 Preview URL: ${previewUrl}`);

    return {
      success: true,
      message: 'Phishing email sent (preview only)',
      previewUrl,
    };
  }

  // לחיצה על הקישור
  @Get('click/:id')
  async handleClick(@Param('id') id: string, @Res() res: Response) {
    try {
      // שולח קריאה לשרת הניהול לעדכן את הסטטוס
      await this.httpService.post(`http://localhost:3001/phishing/update`, {
        attemptId: id,
        status: 'clicked',
      }).toPromise();
    } catch (error) {
      console.error('❌ Failed to notify management server:', error.message);
    }

    res.send(`
      <html>
        <head><title>Oops!</title></head>
        <body style="font-family: sans-serif; text-align: center; margin-top: 100px;">
          <h1>😬 You clicked the phishing link!</h1>
          <p>This was part of a phishing awareness simulation.</p>
        </body>
      </html>
    `);
  }
}
