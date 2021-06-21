import { CountryDto } from '../country/country.dto';

export class WebChannelDto {
  id!: number;
  name!: string;
  country?: CountryDto;
}
