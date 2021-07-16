import { Column, Entity, ManyToOne } from 'typeorm';

import { CountryEntity } from '../country/country.entity';

@Entity('network')
export class NetworkEntity {
  @Column('integer', { primary: true })
  id!: number;

  @Column('text')
  name!: string;

  @ManyToOne(() => CountryEntity, (country) => country.id)
  country!: CountryEntity;
}
