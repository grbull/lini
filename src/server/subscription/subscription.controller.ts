import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { User } from '../common/decorators/user.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { UserEntity } from '../user/user.entity';
import {
  SubscriptionCreateDto,
  SubscriptionRemoveDto,
} from './subscription.dto';
import { SubscriptionEntity } from './subscription.entity';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('all')
  public getAll(@User() user: UserEntity): Promise<SubscriptionEntity[]> {
    return this.subscriptionService.getAll(user);
  }

  @Post()
  public create(
    @User() user: UserEntity,
    @Body() createDto: SubscriptionCreateDto
  ): Promise<SubscriptionEntity> {
    return this.subscriptionService.create(user, createDto);
  }

  @Delete()
  public remove(
    @User() user: UserEntity,
    @Body() removeDto: SubscriptionRemoveDto
  ): Promise<SubscriptionEntity> {
    return this.subscriptionService.remove(user, removeDto);
  }

  // Lists all you've subscribed and unsubsubscribed to??
  // public history() {}
}
