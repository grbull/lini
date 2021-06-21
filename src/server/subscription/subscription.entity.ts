import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ShowEntity } from '../show/show.entity';
import { UserEntity } from '../user/user.entity';

@Entity('subscription')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id!: number;

  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  @Exclude()
  user!: number;

  @ManyToOne(() => ShowEntity, (show) => show.subscriptions)
  show!: ShowEntity;

  @Column({ type: 'boolean', default: true })
  notifications!: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  dateCreated!: string;

  @DeleteDateColumn({ type: 'timestamptz' })
  @Exclude()
  dateDeleted!: string;
}
