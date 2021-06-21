import {
  Body,
  Controller,
  Get,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { User } from '../common/decorators/user.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { UserUpdateDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public getUser(@User() user: UserEntity): UserEntity {
    return user;
  }

  @Put()
  public updateUser(
    @User() user: UserEntity,
    @Body() userUpdateDto: UserUpdateDto
  ): Promise<UserEntity> {
    return this.userService.updateOne(user, userUpdateDto);
  }
}
