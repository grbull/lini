import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';

import { LoggerService } from '../logger/logger.service';
import { UserUpdateDto } from './user.dto';
import { UserEntity, UserRole } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly loggerService: LoggerService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    this.loggerService.setContext('UserService');
  }

  public createOne(email: string): Promise<UserEntity> {
    return this.userRepository.save(this.userRepository.create({ email }));
  }

  public async updateOne(
    user: UserEntity,
    userUpdateDto: UserUpdateDto
  ): Promise<UserEntity> {
    try {
      const userBefore = await this.findOneOrFail({ id: user.id });
      // Have to explicitly create the entity for the transformer to function properly
      const userAfter = new UserEntity();
      Object.assign(userAfter, { ...userBefore, ...userUpdateDto });
      return this.userRepository.save(userAfter);
    } catch {
      throw new NotFoundException();
    }
  }

  public findOne(
    where: FindConditions<UserEntity>
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where });
  }

  public findOneOrFail(where: FindConditions<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({ where });
  }

  public markVerified(user: UserEntity): Promise<UserEntity> {
    const role = user.id === 1 ? UserRole.ADMIN : UserRole.USER;
    return this.userRepository.save({ ...user, role });
  }

  // Used by notification service
  public getCount(): Promise<number> {
    return this.userRepository.count();
  }

  // Used by notification service
  public takeOne(skip: number): Promise<UserEntity | undefined> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.subscriptions', 'subscription')
      .leftJoinAndSelect('subscription.show', 'show')
      .orderBy('user.id', 'ASC')
      .skip(skip)
      .getOne();
  }

  public getUserData(user: UserEntity): Promise<UserEntity | undefined> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.authTokens', 'authToken')
      .leftJoinAndSelect('user.pushSubscriptions', 'pushSubscription')
      .leftJoinAndSelect('user.subscriptions', 'subscription')
      .loadRelationIdAndMap('subscription.show', 'subscription.show')
      .where('user.id = :id', { id: user.id })
      .getOne();
  }
}
