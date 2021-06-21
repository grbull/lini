import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';

@Entity('auth_token')
export class AuthTokenEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('uuid', { generated: 'uuid', unique: true })
  token!: string;

  @ManyToOne(() => UserEntity, (user) => user.authTokens)
  user!: number;

  @Column('inet')
  ipRequested!: string;

  @Column('inet', { nullable: true })
  ipValidated!: string | null;

  @Column('text')
  userAgentRequested!: string;

  @Column('text', { nullable: true })
  userAgentValidated!: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  dateRequested!: string;

  @Column('timestamptz', { nullable: true })
  dateValidated!: string | null;

  @Column('timestamptz')
  dateExpires!: string | null;

  @BeforeInsert()
  defineDateExpires(): void {
    const dateExpires = new Date();
    dateExpires.setMinutes(dateExpires.getMinutes() + 15);
    this.dateExpires = dateExpires.toISOString();
  }
}
