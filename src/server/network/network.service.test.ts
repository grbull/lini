/* eslint-disable init-declarations */
import { Connection, createConnection, Repository } from 'typeorm';

import { CountryEntity } from '../country/country.entity';
import { CountryService } from '../country/country.service';
import { LoggerService } from '../logger/logger.service';
import { NetworkEntity } from './network.entity';
import { NetworkService } from './network.service';

describe('Network Service', () => {
  let connection: Connection;
  let countryRepository: Repository<CountryEntity>;
  let countryService: CountryService;
  let networkRepository: Repository<NetworkEntity>;
  let networkService: NetworkService;
  let loggerService: LoggerService;

  beforeAll(async () => {
    loggerService = new LoggerService();
    connection = await createConnection('test');
    countryRepository = connection.getRepository(CountryEntity);
    countryService = new CountryService(loggerService, countryRepository);
    networkRepository = connection.getRepository(NetworkEntity);

    networkService = new NetworkService(
      loggerService,
      countryService,
      networkRepository
    );
  });
  afterAll(async () => await connection.close());

  describe('createOrUpdate', () => {
    it('should create a network and related country', async () => {
      const tvMazeNetwork = {
        id: 10,
        name: 'Adult Swim',
        country: {
          name: 'United States',
          code: 'US',
          timezone: 'America/New_York',
        },
      };
      const networkEntity = {
        id: 10,
        name: 'Adult Swim',
        country: {
          id: 1,
          name: 'United States',
          code: 'US',
          timezone: 'America/New_York',
        },
      };

      expect(await networkService.createOrUpdate(tvMazeNetwork)).toStrictEqual(
        networkEntity
      );
    });
  });
});
