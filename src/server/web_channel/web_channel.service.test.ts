/* eslint-disable init-declarations */
import { Connection, createConnection, Repository } from 'typeorm';

import { CountryEntity } from '../country/country.entity';
import { CountryService } from '../country/country.service';
import { LoggerService } from '../logger/logger.service';
import { WebChannelEntity } from './web_channel.entity';
import { WebChannelService } from './web_channel.service';

describe('Network Service', () => {
  let connection: Connection;
  let countryRepository: Repository<CountryEntity>;
  let countryService: CountryService;
  let webChannelRepository: Repository<WebChannelEntity>;
  let webChannelService: WebChannelService;
  let loggerService: LoggerService;

  beforeAll(async () => {
    loggerService = new LoggerService();
    connection = await createConnection('test');
    countryRepository = connection.getRepository(CountryEntity);
    countryService = new CountryService(loggerService, countryRepository);
    webChannelRepository = connection.getRepository(WebChannelEntity);
    webChannelService = new WebChannelService(
      loggerService,
      countryService,
      webChannelRepository
    );
  });
  afterAll(async () => await connection.close());

  describe('createOrUpdate', () => {
    it('should create a network', async () => {
      const tvMazeWebChannel = {
        id: 1,
        name: 'Netflix',
        country: {
          name: 'United States',
          code: 'US',
          timezone: 'America/New_York',
        },
      };
      const networkEntity = {
        id: 1,
        name: 'Netflix',
        country: 1,
      };

      expect(
        await webChannelService.createOrUpdate(tvMazeWebChannel)
      ).toStrictEqual(networkEntity);
    });
    it('should create a network and related country', async () => {
      const tvMazeWebChannel = {
        id: 2,
        name: 'Hulu',
        country: {
          name: 'United States',
          code: 'US',
          timezone: 'America/New_York',
        },
      };
      const networkEntityExpected = {
        country: undefined,
        id: 2,
        name: 'Hulu',
      };

      const networkEntityActual = await webChannelService.createOrUpdate(
        tvMazeWebChannel
      );

      expect(
        await webChannelService.createOrUpdate(tvMazeWebChannel)
      ).toStrictEqual({
        ...networkEntityExpected,
        country: networkEntityActual.country,
      });
    });
  });
});
