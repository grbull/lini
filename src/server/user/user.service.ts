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

  public findOneOrFail(where: FindConditions<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({ where });
  }

  public findOne(
    where: FindConditions<UserEntity>
  ): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where });
  }

  public async createOne(email: string): Promise<UserEntity> {
    if ((await this.userRepository.count()) === 0) {
      return this.userRepository.save(
        this.userRepository.create({ email, role: UserRole.ADMIN })
      );
    }
    return this.userRepository.save(this.userRepository.create({ email }));
  }

  public markVerified(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save({ ...user, isVerified: true });
  }

  /**
   * Called to update a user's preferences
   */
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
      .skip(skip)
      .getOne();
  }
}
