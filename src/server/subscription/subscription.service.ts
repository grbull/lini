import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoggerService } from '../logger/logger.service';
import { UserEntity } from '../user/user.entity';
import {
  SubscriptionCreateDto,
  SubscriptionRemoveDto,
  SubscriptionUpdateDto,
} from './subscription.dto';
import { SubscriptionEntity } from './subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly loggerService: LoggerService,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>
  ) {
    this.loggerService.setContext('SubscriptionService');
  }

  public getAll(user: UserEntity): Promise<SubscriptionEntity[]> {
    return this.subscriptionRepository.find({
      where: { user: user.id },
      relations: ['show'],
    });
  }

  public async create(
    user: UserEntity,
    createDto: SubscriptionCreateDto
  ): Promise<SubscriptionEntity> {
    try {
      return await this.subscriptionRepository.findOneOrFail(
        { user: user.id, show: { id: createDto.show } },
        { relations: ['show'] }
      );
    } catch {
      await this.subscriptionRepository.save(
        this.subscriptionRepository.create({
          user: user.id,
          show: { id: createDto.show },
        })
      );
      return await this.subscriptionRepository.findOneOrFail(
        { user: user.id, show: { id: createDto.show } },
        { relations: ['show'] }
      );
    }
  }

  public async update(
    user: UserEntity,
    updateDto: SubscriptionUpdateDto
  ): Promise<SubscriptionEntity> {
    try {
      const subscription = await this.subscriptionRepository.findOneOrFail({
        where: { show: updateDto.show, user: user.id },
      });
      await this.subscriptionRepository.save(
        Object.assign(subscription, updateDto)
      );
      return await this.subscriptionRepository.findOneOrFail(
        { user: user.id, show: { id: updateDto.show } },
        { relations: ['show'] }
      );
    } catch {
      throw new NotFoundException();
    }
  }

  public async remove(
    user: UserEntity,
    removeDto: SubscriptionRemoveDto
  ): Promise<SubscriptionEntity> {
    try {
      const subscription = await this.subscriptionRepository.findOneOrFail({
        where: { show: removeDto.show, user: user.id },
        relations: ['show'],
      });
      return this.subscriptionRepository.softRemove(subscription);
    } catch {
      throw new NotFoundException();
    }
  }
}
