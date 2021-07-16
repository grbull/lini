import { classToPlain, plainToClass } from 'class-transformer';

import { CountryDto } from './country.dto';
import { CountryEntity } from './country.entity';

describe('Country Dto', () => {
  const countryEntity: CountryEntity = Object.assign(new CountryEntity(), {
    id: 1,
    name: 'United Kingdom',
    code: 'GB',
    timezone: 'Europe/London',
  });
  const countryDto: CountryDto = {
    name: 'United Kingdom',
    code: 'GB',
    timezone: 'Europe/London',
  };

  it('should transform entity to dto', () => {
    expect(classToPlain(countryEntity)).toStrictEqual(countryDto);
  });

  it('should transform dto object to dto class', () => {
    const countryDtoClass = Object.assign(new CountryDto(), countryDto);

    expect(plainToClass(CountryDto, countryDto)).toStrictEqual(countryDtoClass);
  });
});
