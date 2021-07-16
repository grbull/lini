import { classToPlain, plainToClass } from 'class-transformer';

import { CountryDto } from '../country/country.dto';
import { CountryEntity } from '../country/country.entity';
import { WebChannelDto } from './web_channel.dto';
import { WebChannelEntity } from './web_channel.entity';

describe('WebChannel Dto', () => {
  const countryEntity: CountryEntity = Object.assign(new CountryEntity(), {
    id: 1,
    name: 'United Kingdom',
    code: 'GB',
    timezone: 'Europe/London',
  });

  const webChannelEntity: WebChannelEntity = Object.assign(
    new WebChannelEntity(),
    {
      id: 1,
      name: 'DemoWebChannel',
      country: countryEntity,
    }
  );

  const countryDto: CountryDto = {
    name: 'United Kingdom',
    code: 'GB',
    timezone: 'Europe/London',
  };

  const webChannelDto: WebChannelDto = {
    id: 1,
    name: 'DemoWebChannel',
    country: countryDto,
  };

  it('should transform entity to dto', () => {
    expect(classToPlain(webChannelEntity)).toEqual(webChannelDto);
  });

  it('should transform dto object to dto class', () => {
    const webChannelDtoClass = Object.assign(
      new WebChannelDto(),
      webChannelDto
    );

    expect(plainToClass(WebChannelDto, webChannelDto)).toStrictEqual(
      webChannelDtoClass
    );
  });
});
