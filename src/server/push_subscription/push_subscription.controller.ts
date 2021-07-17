import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { User } from '../common/decorators/user.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { UserEntity } from '../user/user.entity';
import { PushSubscriptionCreateDto } from './push_subscription.dto';
import { PushSubscriptionService } from './push_subscription.service';

@Controller('push_subscription')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class PushSubscriptionController {
  constructor(
    private readonly pushSubscriptionService: PushSubscriptionService
  ) {}

  @Post()
  public create(
    @User() user: UserEntity,
    @Body() createDto: PushSubscriptionCreateDto
  ): Promise<void> {
    return this.pushSubscriptionService.create(user, createDto);
  }
}
