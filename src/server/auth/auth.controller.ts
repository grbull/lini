/* eslint-disable class-methods-use-this */
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Throttle } from '@nestjs/throttler';
import { Request, Response } from 'express';

import { User } from '../common/decorators/user.decorator';
import { MagicLinkGuard } from '../common/guards/magic_link.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { UserEntity } from '../user/user.entity';
import { AuthLoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  private readonly clientURL: string;
  private readonly cookie: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    this.clientURL = configService.get('CLIENT_URL', 'http://localhost:3000/');
    this.cookie = configService.get('COOKIE_NAME', 'lini');
  }

  @Post('login')
  @Throttle(5, 360)
  public login(
    @Req() req: Request,
    @Body() loginDto: AuthLoginDto
  ): Promise<void> {
    return this.authService.sendMagicLink(
      loginDto.email,
      req.ip,
      req.headers['user-agent']
    );
  }

  @Post('validate')
  @UseGuards(MagicLinkGuard)
  public validateLogin(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Get('logout')
  public logout(@Req() req: Request, @Res() res: Response): void {
    // req.session?.destroy((): void => undefined);
    req.logout();
    res.clearCookie(this.cookie);
    return res.redirect(this.clientURL);
  }
}
