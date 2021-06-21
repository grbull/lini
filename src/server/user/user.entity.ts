import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AuthTokenEntity } from '../auth/auth_token.entity';
import { PushSubscriptionEntity } from '../push_subscription/push_subscription.entity';
import { SubscriptionEntity } from '../subscription/subscription.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  UNVERIFIED = 'unverified',
}

export enum UserTheme {
  AUTO = 'auto',
  LIGHT = 'light',
  DARK = 'dark',
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  @Exclude()
  id!: number;

  @Column('citext', { unique: true })
  email!: string;

  @Column('enum', { enum: UserRole, default: UserRole.UNVERIFIED })
  role!: UserRole;

  /* User preferences */
  @Column('enum', { enum: UserTheme, default: UserTheme.AUTO })
  theme!: UserTheme;

  @Column('bool', { default: false })
  dataSaving!: boolean;

  @Column('bool', { default: true })
  notifications!: boolean;

  /* Relations */
  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.user)
  subscriptions!: SubscriptionEntity[];

  @OneToMany(() => AuthTokenEntity, (auth) => auth.user)
  authTokens!: AuthTokenEntity[];

  @OneToMany(() => PushSubscriptionEntity, (pushSub) => pushSub.user)
  pushSubscriptions!: PushSubscriptionEntity[];

  /* Date related */
  @CreateDateColumn({ type: 'timestamptz' })
  dateCreated!: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  dateUpdated!: string;
}
