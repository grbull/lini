import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('country')
export class CountryEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id!: number;

  @Column('text')
  name!: string;

  @Column('text')
  code!: string;

  @Column('text')
  timezone!: string;
}
