import {
  Body,
  Controller,
  Get,
  Put,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { Response } from 'express';

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

  @Get('data')
  public async getUserData(
    @User() user: UserEntity,
    @Res() res: Response
  ): Promise<void> {
    const date = new Date().toISOString();
    res
      .attachment(`lini_user_data_${date}.json`)
      .send(classToPlain(await this.userService.getUserData(user)));
  }
}
