import { classToPlain, plainToClass } from 'class-transformer';

import { CountryDto } from '../country/country.dto';
import { CountryEntity } from '../country/country.entity';
import { NetworkDto } from './network.dto';
import { NetworkEntity } from './network.entity';

describe('Network Dto', () => {
  const countryEntity: CountryEntity = Object.assign(new CountryEntity(), {
    id: 1,
    name: 'United Kingdom',
    code: 'GB',
    timezone: 'Europe/London',
  });

  const networkEntity: NetworkEntity = Object.assign(new NetworkEntity(), {
    id: 1,
    name: 'DemoNetwork',
    country: countryEntity,
  });

  const countryDto: CountryDto = {
    name: 'United Kingdom',
    code: 'GB',
    timezone: 'Europe/London',
  };

  const networkDto: NetworkDto = {
    id: 1,
    name: 'DemoNetwork',
    country: countryDto,
  };

  it('should transform entity to dto', () => {
    expect(classToPlain(networkEntity)).toEqual(networkDto);
  });

  it('should transform dto object to dto class', () => {
    const networkDtoClass = Object.assign(new NetworkDto(), networkDto);

    expect(plainToClass(NetworkDto, networkDto)).toStrictEqual(networkDtoClass);
  });
});
