import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

import { EpisodeService } from '../episode/episode.service';
import { LoggerService } from '../logger/logger.service';
import { ShowEntity } from '../show/show.entity';
import { ShowService } from '../show/show.service';
import { tvMazeApi } from './tvmaze.api';
import { TvMazeShowEmbedded } from './tvmaze.types';

@Injectable()
export class TvMazeService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService,
    private readonly showService: ShowService,
    private readonly episodeService: EpisodeService
  ) {
    this.loggerService.setContext('TvMazeService');
  }

  /**
   * Collects new series, and their respective episodes.
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  public async dailySeed(): Promise<void> {
    if (this.configService.get('NODE_ENV') === 'production') {
      this.loggerService.log('Daily update cron job started.');
      await this.seedSeries();
      await this.seedEpisodes();
      this.loggerService.log('Daily update cron job complete.');
    }
  }

  /**
   * Checks for outdated series, and updates them and their respective eposides.
   */
  @Cron(CronExpression.EVERY_HOUR)
  public async hourlyUpdate(): Promise<void> {
    if (this.configService.get('NODE_ENV') === 'production') {
      this.loggerService.log('Hourly update cron job started.');
      await this.updateShows();
      this.loggerService.log('Hourly update cron job complete.');
    }
  }

  /**
   * Used both for the initial seeding of database,
   * and to collect newly added series.
   */
  public async seedSeries(): Promise<void> {
    this.loggerService.log('Seeding of series started.');

    for (let currentPage = 0; true; currentPage++) {
      this.loggerService.debug('Series page: ' + currentPage);

      try {
        const shows = await tvMazeApi.fetchShowsByIndex(currentPage);
        await this.showService.createManyIfDoesNotExist(shows);
      } catch (error) {
        if (error.response.status === 404) {
          // If we get a 404 response code, we've gone through all the pages.
          break;
        }
        this.loggerService.error('Error seeding series', error);
      }
    }

    this.loggerService.log('Seeding of series complete.');
  }

  /**
   * Used both for the initial seeding of database,
   * and to collect episodes ofnewly added series.
   */
  public async seedEpisodes(): Promise<void> {
    this.loggerService.log('Seeding of episodes started.');

    const showsToSeed = await this.showService.getShowsToSeed();

    for (const show of showsToSeed) {
      this.loggerService.debug(show);
      if (await this.updateEpisodes(show.id)) {
        await this.showService.markSeeded(show.id);
      }
    }

    this.loggerService.log('Seeding of episodes complete.');
  }

  // Update shows
  // TODO: ERROR HANDLING
  private async getShowsToUpdate(): Promise<ShowEntity['id'][]> {
    const updates = await tvMazeApi.fetchShowUpdates();
    const shows = await this.showService.getShowsLastUpdated();

    const showsToUpdate: number[] = [];

    shows.map((show) => {
      const showLastUpdated = new Date(show.dateUpdated);
      const apiLastUpdate = new Date(updates[show.id.toString()] * 1000);

      if (showLastUpdated < apiLastUpdate) {
        showsToUpdate.push(show.id);

        this.loggerService.debug({
          id: show.id,
          showLastUpdated: showLastUpdated.toISOString(),
          apiLastUpdate: apiLastUpdate.toISOString(),
        });
      }
    });

    return showsToUpdate;
  }

  private async updateEpisodes(
    showId: number
  ): Promise<TvMazeShowEmbedded | undefined> {
    try {
      const showEmbedded = await tvMazeApi.fetchShowEmbedded(showId);

      await this.episodeService.createOrUpdateMany(
        showEmbedded._embedded.episodes,
        showId
      );
      await this.showService.markSeeded(showId);

      return showEmbedded;
    } catch (error) {
      if (error.response.status === 404) {
        this.loggerService.debug(
          `Show no longer exists on API, deleting show. ID: ${showId}`
        );
        await this.showService.deleteOneById(showId);
      }
      this.loggerService.error(error);
    }
  }

  // this needs a daily cron
  public async updateShows(): Promise<void> {
    this.loggerService.log('Updating shows started.');

    const showsToUpdate = await this.getShowsToUpdate();

    for (const showId of showsToUpdate) {
      const showEmbedded = await this.updateEpisodes(showId);
      if (showEmbedded) {
        await this.showService.updateShow(showEmbedded);
      }
    }

    this.loggerService.log('Updating shows complete.');
  }
}
