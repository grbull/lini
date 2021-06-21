/* eslint-disable init-declarations */
import { Connection, createConnection, Repository } from 'typeorm';

import { LoggerService } from '../logger/logger.service';
import { TvMazeCountry } from '../tvmaze/tvmaze.types';
import { CountryEntity } from './country.entity';
import { CountryService } from './country.service';

describe('Country Service', () => {
  let connection: Connection;
  let countryRepository: Repository<CountryEntity>;
  let countryService: CountryService;
  let loggerService: LoggerService;
  let seedCountryId: number;
  const seedCountry: TvMazeCountry = {
    name: 'United Kingdom',
    code: 'GB',
    timezone: 'Europe/London',
  };

  beforeAll(async () => {
    connection = await createConnection('test');
    countryRepository = connection.getRepository(CountryEntity);
    loggerService = new LoggerService();
    countryService = new CountryService(loggerService, countryRepository);
  });
  afterAll(async () => await connection.close());

  it('should create a new country', async () => {
    const newCountry = await countryService.findOrCreate(seedCountry);
    seedCountryId = newCountry.id;
    expect(newCountry).toMatchObject(seedCountry);
  });

  it('should return existing country', async () => {
    const existingCountry = await countryService.findOrCreate(seedCountry);
    expect(existingCountry.id).toEqual(seedCountryId);
  });
});
