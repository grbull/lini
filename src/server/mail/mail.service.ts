import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import pug from 'pug';

import { AuthTokenEntity } from '../auth/auth_token.entity';
import { LoggerService } from '../logger/logger.service';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class MailService {
  nodemailer!: Mail;
  loginTemplate: pug.compileTemplate;

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
    this.loginTemplate = pug.compileFile('src/server/mail/login_email.pug');
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

  public async sendLogin(
    user: UserEntity,
    authToken: AuthTokenEntity
  ): Promise<void> {
    // we can add request details, etc
    const body = this.loginTemplate({
      email: user.email,
      date: new Date().toISOString(),
      userAgent: authToken.userAgentRequested,
      ip: authToken.ipRequested,
      link: `${this.configService.get('CLIENT_URL')}/validate?token=${
        authToken.token
      }`,
    });

    const mailOptions = {
      from: this.configService.get('GMAIL_USER'),
      to: user.email,
      subject: 'Your login code for Lini.',
      html: body,
    };
    await this.sendEmail(mailOptions);
  }
}
