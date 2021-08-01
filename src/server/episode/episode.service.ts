import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { LoggerService } from '../logger/logger.service';
import { SubscriptionService } from '../subscription/subscription.service';
import { TvMazeEpisode } from '../tvmaze/tvmaze.types';
import { tvMazeEpisodeToEntity } from '../tvmaze/tvmaze.utils';
import { UserEntity } from '../user/user.entity';
import { EpisodeEntity } from './episode.entity';

@Injectable()
export class EpisodeService {
  constructor(
    private readonly loggerService: LoggerService,
    @InjectRepository(EpisodeEntity)
    private readonly episodeRepository: Repository<EpisodeEntity>,
    private readonly subscriptionService: SubscriptionService
  ) {
    this.loggerService.setContext('EpisodeService');
  }

  public async getOne(id: number): Promise<EpisodeEntity> {
    try {
      return await this.episodeRepository
        .createQueryBuilder('episode')
        .leftJoinAndSelect('episode.show', 'show')
        .leftJoinAndSelect('show.network', 'network')
        .leftJoinAndSelect('network.country', 'networkCountry')
        .leftJoinAndSelect('show.webChannel', 'webChannel')
        .leftJoinAndSelect('webChannel.country', 'webChannelCountry')
        .where('episode.id = :id', { id })
        .getOneOrFail();
    } catch {
      throw new NotFoundException();
    }
  }

  public async getFuture(user: UserEntity): Promise<EpisodeEntity[]> {
    const subscriptions = await this.subscriptionService.getAll(user);

    const oneMonthAhead = new Date();
    oneMonthAhead.setMonth(new Date().getMonth() + 1);

    const findOptions = subscriptions.map((subscription) => {
      return {
        airstamp: Between(new Date(), oneMonthAhead),
        show: subscription.show,
      };
    });

    return this.episodeRepository.find({
      where: findOptions,
      order: {
        airstamp: 'ASC',
        number: 'ASC',
      },
      relations: ['show'],
    });
  }

  public async getPast(user: UserEntity): Promise<EpisodeEntity[]> {
    const subscriptions = await this.subscriptionService.getAll(user);

    const oneMonthBehind = new Date();
    oneMonthBehind.setMonth(new Date().getMonth() - 1);

    const findOptions = subscriptions.map((subscription) => {
      return {
        airstamp: Between(oneMonthBehind, new Date()),
        show: subscription.show,
      };
    });

    return this.episodeRepository.find({
      where: findOptions,
      order: {
        airstamp: 'DESC',
        number: 'DESC',
        name: 'ASC',
      },
      relations: ['show'],
    });
  }

  // The below is used for seeding and updating
  public createOrUpdateMany(
    episodes: TvMazeEpisode[],
    showId: number
  ): Promise<EpisodeEntity[]> {
    const episodeEntities = episodes.map((episode) =>
      tvMazeEpisodeToEntity(episode, showId)
    );

    return this.episodeRepository.save(episodeEntities, { chunk: 1000 });
  }

  // used by notification service
  public findByTime(
    showId: number,
    startTime: Date,
    endTime: Date
  ): Promise<EpisodeEntity[]> {
    return this.episodeRepository.find({
      where: { show: showId, airstamp: Between(startTime, endTime) },
    });
  }
}
