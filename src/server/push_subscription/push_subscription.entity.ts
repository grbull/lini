import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity('push_subscription')
export class PushSubscriptionEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => UserEntity, (user) => user.subscriptions)
  user!: number;

  @Column('text')
  endpoint!: string;

  @Column('text')
  auth!: string;

  @Column('text')
  p256dh!: string;
}
