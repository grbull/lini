import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';

import { UserEntity } from '../../user/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class MagicLinkStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request): Promise<UserEntity> {
    const user = await this.authService.validate(
      req.body.token,
      req.ip,
      req.headers['user-agent']
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
