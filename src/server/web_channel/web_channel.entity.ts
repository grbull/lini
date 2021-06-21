import { Column, Entity, ManyToOne } from 'typeorm';

import { CountryEntity } from '../country/country.entity';

@Entity('web_channel')
export class WebChannelEntity {
  @Column('integer', { primary: true })
  id!: number;

  @Column('text')
  name!: string;

  @ManyToOne(() => CountryEntity, (country) => country.id, { nullable: true })
  country!: number | null;
}
