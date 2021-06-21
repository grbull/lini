import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

import { ShowDto } from '../show/show.dto';

export class SubscriptionDto {
  // Might return ShowEntity
  show!: ShowDto;
  notification!: boolean;
  dateCreated!: string;
}

export class SubscriptionCreateDto {
  @IsNotEmpty()
  @IsNumber()
  show!: number;
}

export class SubscriptionRemoveDto {
  @IsNotEmpty()
  @IsNumber()
  show!: number;
}

export class SubscriptionUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  show!: number;

  @IsNotEmpty()
  @IsBoolean()
  notifications!: boolean;
}
