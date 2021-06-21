import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

import { LoggerService } from '../logger/logger.service';

@Injectable()
export class MailService {
  nodemailer!: Mail;

  constructor(
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService
  ) {
    this.loggerService.setContext('MailService');
    this.nodemailer = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: configService.get('GMAIL_USER'),
        pass: configService.get('GMAIL_PASS'),
      },
    });
  }

  public sendEmail(mailOptions: Mail.Options): Promise<void> {
    this.loggerService.debug('Sending Email' + JSON.stringify(mailOptions));
    return new Promise((resolve, reject) => {
      this.nodemailer.sendMail(mailOptions, (error, info) => {
        if (error) {
          this.loggerService.error(
            'Error sending email ' + error.message,
            error.stack
          );
          reject(error);
        } else {
          this.loggerService.debug('Email sent: ' + info.response);
          resolve();
        }
      });
    });
  }

  public async sendRegistration(email: string, token: string): Promise<void> {
    // we can add request details, etc
    const mailOptions = {
      from: this.configService.get('GMAIL_USER'),
      to: email,
      subject: 'Your registration code for Lini.',
      text: `${this.configService.get('CLIENT_URL')}/validate?token=${token}`,
    };
    await this.sendEmail(mailOptions);
  }

  public async sendLogin(email: string, token: string): Promise<void> {
    // we can add request details, etc
    const mailOptions = {
      from: this.configService.get('GMAIL_USER'),
      to: email,
      subject: 'Your login code for Lini.',
      text: `${this.configService.get('CLIENT_URL')}/validate?token=${token}`,
    };
    await this.sendEmail(mailOptions);
  }
}
