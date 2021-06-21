import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from '../logger/logger.module';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthTokenEntity } from './auth_token.entity';
import { SessionSerializer } from './session.serializer';
import { MagicLinkStrategy } from './strategies/magic_link.strategy';

@Module({
  imports: [
    LoggerModule,
    MailModule,
    UserModule,
    TypeOrmModule.forFeature([AuthTokenEntity]),
    PassportModule.register({ session: true }),
  ],
  providers: [AuthService, MagicLinkStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
