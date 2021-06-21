import { classToPlain } from 'class-transformer';

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

  it('should transform properly to dto', () => {
    expect(classToPlain(countryEntity)).toStrictEqual(countryDto);
  });
});
