/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  public serializeUser(
    user: UserEntity,
    done: (err: Error | null, user: UserEntity['id']) => void
  ): void {
    done(null, user.id);
  }

  public deserializeUser(
    id: UserEntity['id'],
    done: (err: Error | null, payload?: UserEntity) => void
  ): void {
    this.userService
      .findOneOrFail({ id })
      .then((user) => done(null, user))
      .catch((error) => done(error));
  }
}
