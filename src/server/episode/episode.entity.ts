import { Column, Entity, ManyToOne } from 'typeorm';

import { ShowEntity } from '../show/show.entity';

@Entity('episode')
export class EpisodeEntity {
  @Column('bigint', { primary: true })
  id!: string;

  @Column('text')
  name!: string;

  @Column('integer')
  season!: number;

  @Column('integer')
  number!: number;

  @Column('text')
  type!: string;

  @Column('date', { nullable: true })
  airdate!: string | null;

  @Column('time', { nullable: true })
  airtime!: string | null;

  @Column('timestamptz', { nullable: true })
  airstamp!: string | null;

  @Column('integer', { nullable: true })
  runtime!: number | null;

  @Column('text', { nullable: true })
  imageMedium!: string | null;

  @Column('text', { nullable: true })
  imageOriginal!: string | null;

  @Column('text', { nullable: true })
  summary!: string | null;

  @ManyToOne(() => ShowEntity, (show) => show.episodes)
  show!: number;
}
