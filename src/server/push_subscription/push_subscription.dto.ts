import { IsNotEmpty, IsString } from 'class-validator';

export class PushSubscriptionCreateDto {
  @IsNotEmpty()
  @IsString()
  endpoint!: string;

  @IsNotEmpty()
  @IsString()
  auth!: string;

  @IsNotEmpty()
  @IsString()
  p256dh!: string;
}

export class PushSubscriptionRemoveDto {}
