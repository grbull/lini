import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

import { EpisodeEntity } from '../episode/episode.entity';
import { NetworkEntity } from '../network/network.entity';
import { SubscriptionEntity } from '../subscription/subscription.entity';
import { DayOfWeek } from '../tvmaze/tvmaze.types';
import { WebChannelEntity } from '../web_channel/web_channel.entity';

@Entity('show')
export class ShowEntity {
  @Column('integer', { primary: true })
  id!: number;

  @Column('text')
  name!: string;

  // Scripted/Documentary/Reality/etc
  @Column('text')
  type!: string;

  @Column('text', { nullable: true })
  language!: string | null;

  @Column('text', { array: true })
  genres!: string[];

  // "Running or ended"
  @Column('text')
  status!: string;

  @Column('integer', { nullable: true })
  runtime!: number | null;

  @Column('integer', { nullable: true })
  runtimeAverage!: number | null;

  @Column('date', { nullable: true })
  datePremiered!: string | null;

  @Column('text', { nullable: true })
  officialSite!: string | null;

  @Column('time', { nullable: true })
  scheduleTime!: string | null;

  @Column('enum', { enum: DayOfWeek, array: true })
  scheduleDays!: (keyof typeof DayOfWeek)[];

  @Column('float', { nullable: true })
  rating!: number | null;

  @Column('integer')
  @Exclude()
  weight!: number;

  @ManyToOne(() => NetworkEntity, (network) => network.id, {
    nullable: true,
  })
  network!: NetworkEntity | null;

  @ManyToOne(() => WebChannelEntity, (webChannel) => webChannel.id, {
    nullable: true,
  })
  webChannel!: WebChannelEntity | null;

  @Column('integer', { nullable: true })
  @Exclude()
  tvrage!: number | null;

  @Column('integer', { nullable: true })
  @Exclude()
  thetvdb!: number | null;

  @Column('text', { nullable: true })
  @Exclude()
  imdb!: string | null;

  @Column('text', { nullable: true })
  imageMedium!: string | null;

  @Column('text', { nullable: true })
  imageOriginal!: string | null;

  @Column('text', { nullable: true })
  summary!: string | null;

  @OneToMany(() => EpisodeEntity, (episode) => episode.show)
  episodes!: EpisodeEntity[];

  @Column('bool', { default: false, select: false })
  @Exclude()
  isSeeded!: boolean;

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.show)
  @Exclude()
  subscriptions!: SubscriptionEntity[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Exclude()
  dateCreated!: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Exclude()
  dateUpdated!: string;
}
