import { IsNotEmpty, IsNumber } from 'class-validator';

import { ShowDto } from '../show/show.dto';

export class SubscriptionDto {
  show!: ShowDto;
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
