import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';

import { LoggerService } from '../logger/logger.service';
import { NetworkService } from '../network/network.service';
import { TvMazeShow, TvMazeShowEmbedded } from '../tvmaze/tvmaze.types';
import { TvMazeShowToEntity } from '../tvmaze/tvmaze.utils';
import { WebChannelService } from '../web_channel/web_channel.service';
import { ShowEntity } from './show.entity';

@Injectable()
export class ShowService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly networkService: NetworkService,
    private readonly webChannelService: WebChannelService,
    @InjectRepository(ShowEntity)
    private readonly showRepository: Repository<ShowEntity>
  ) {
    this.loggerService.setContext('ShowService');
  }

  /**
   * Used for search and autocomplete when typing in a search box. Returns 5 items
   * Considering returning paginated result for search. TBD
   */
  public autoComplete(query: string): Promise<ShowEntity[]> {
    return this.showRepository
      .createQueryBuilder('show')
      .where({
        name: Raw((name) => `LOWER(${name}) LIKE '%${query.toLowerCase()}%'`),
      })
      .leftJoinAndSelect('show.network', 'network')
      .leftJoinAndSelect('network.country', 'networkCountry')
      .leftJoinAndSelect('show.webChannel', 'webChannel')
      .leftJoinAndSelect('webChannel.country', 'webChannelCountry')
      .take(5)
      .getMany();
  }

  public search(query: string): Promise<ShowEntity[]> {
    return this.showRepository
      .createQueryBuilder('show')
      .where({
        name: Raw((name) => `LOWER(${name}) LIKE '%${query.toLowerCase()}%'`),
      })
      .leftJoinAndSelect('show.network', 'network')
      .leftJoinAndSelect('network.country', 'networkCountry')
      .leftJoinAndSelect('show.webChannel', 'webChannel')
      .leftJoinAndSelect('webChannel.country', 'webChannelCountry')
      .take(48)
      .getMany();
  }

  public async getOne(id: number): Promise<ShowEntity> {
    try {
      return await this.showRepository
        .createQueryBuilder('show')
        .where('show.id = :id', { id })
        .leftJoinAndSelect('show.network', 'network')
        .leftJoinAndSelect('network.country', 'networkCountry')
        .leftJoinAndSelect('show.webChannel', 'webChannel')
        .leftJoinAndSelect('webChannel.country', 'webChannelCountry')
        .leftJoinAndSelect('show.episodes', 'episode')
        .orderBy('episode.number', 'ASC')
        .getOneOrFail();
    } catch {
      throw new NotFoundException();
    }
  }

  // All of the below is used primarily for seeding and updating from tvmaze

  /**
   * Used when seeding series. We filter out existing to avoid altering
   * the update column. We want to avoid marking series as updated, when we
   * havn't updated the relevant episodes.
   */
  public async createMany(shows: TvMazeShow[]): Promise<ShowEntity[]> {
    // Filter out existing shows
    const existingShows = await this.showRepository.find({
      select: ['id'],
      where: shows.map((show) => ({ id: show.id })),
    });
    const showsToCreate = shows.filter(
      (show) => !existingShows.find(({ id }) => id === show.id)
    );

    const showEntities: ShowEntity[] = [];

    // Must be done synchronously to avoid duplicate relations
    for (const show of showsToCreate) {
      showEntities.push(await this.createOne(show));
    }

    return this.showRepository.save(showEntities);
  }

  private async createOne(
    show: TvMazeShow | TvMazeShowEmbedded
  ): Promise<ShowEntity> {
    const webChannel = show.webChannel
      ? await this.webChannelService.createOrUpdate(show.webChannel)
      : null;
    const network = show.network
      ? await this.networkService.createOrUpdate(show.network)
      : null;

    return this.showRepository.create(
      TvMazeShowToEntity(show, network, webChannel)
    );
  }

  public async deleteOne(showId: number): Promise<void> {
    await this.showRepository.delete(showId);
  }

  public async updateOne(show: TvMazeShowEmbedded): Promise<ShowEntity> {
    const showEntity = await this.createOne(show);
    return this.showRepository.save(showEntity);
  }

  public async markSeeded(showId: number): Promise<void> {
    await this.showRepository.update(showId, { isSeeded: true });
  }

  public getShowsToSeed(): Promise<
    Pick<ShowEntity, 'id' | 'isSeeded' | 'name'>[]
  > {
    return this.showRepository
      .createQueryBuilder('show')
      .select(['show.id', 'show.isSeeded', 'show.name'])
      .where('show.isSeeded = :isSeeded', { isSeeded: false })
      .orderBy('show.id', 'ASC')
      .getMany();
  }

  public getShowsLastUpdated(): Promise<
    Pick<ShowEntity, 'id' | 'dateUpdated'>[]
  > {
    return this.showRepository
      .createQueryBuilder('show')
      .select(['show.id', 'show.dateUpdated'])
      .orderBy('show.id', 'ASC')
      .getMany();
  }
}
