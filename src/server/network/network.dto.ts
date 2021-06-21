import { CountryDto } from '../country/country.dto';

export class NetworkDto {
  id!: number;
  name!: string;
  country!: CountryDto;
}
