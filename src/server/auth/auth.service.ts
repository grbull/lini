import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Raw, Repository } from 'typeorm';

import { LoggerService } from '../logger/logger.service';
import { MailService } from '../mail/mail.service';
import { UserEntity, UserRole } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthTokenEntity } from './auth_token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly loggerService: LoggerService,
    @InjectRepository(AuthTokenEntity)
    private readonly authTokenRepository: Repository<AuthTokenEntity>,
    private readonly mailService: MailService,
    private readonly userService: UserService
  ) {
    this.loggerService.setContext('AuthService');
  }

  public async sendMagicLink(
    email: string,
    ip: string,
    userAgent?: string
  ): Promise<void> {
    // must validate email

    // See if user exists
    let user = await this.userService.findOne({ email });
    if (user) {
      // Confirm user has no active codes
      const existingAuthToken = await this.authTokenRepository.findOne({
        user: user.id,
        dateValidated: IsNull(),
        dateExpires: Raw((alias) => `${alias} >= NOW()`),
      });

      if (existingAuthToken) {
        // Considering sending time back until they can request a new code
        throw new HttpException(
          'You cannot request another token so soon.',
          429
        );
      }
    } else {
      user = await this.userService.createOne(email);
    }

    // create a code
    const authTokenEntity = await this.authTokenRepository.save(
      this.authTokenRepository.create({
        user: user.id,
        ipRequested: ip,
        userAgentRequested: userAgent,
      })
    );

    await this.mailService.sendLogin(user.email, authTokenEntity.token);
  }

  public async validate(
    token: string,
    ip: string,
    userAgent?: string
  ): Promise<UserEntity | null> {
    try {
      const authCode = await this.authTokenRepository.findOneOrFail(
        {
          token,
          dateValidated: IsNull(),
          dateExpires: Raw((alias) => `${alias} >= NOW()`),
        },
        { loadRelationIds: true }
      );

      let user = await this.userService.findOneOrFail({ id: authCode.user });

      if (user.role === UserRole.UNVERIFIED) {
        user = await this.userService.markVerified(user);
      }

      await this.authTokenRepository.save({
        ...authCode,
        ipValidated: ip,
        userAgentValidated: userAgent,
        dateValidated: new Date().toISOString(),
      });

      return user;
    } catch {
      return null;
    }
  }
}
