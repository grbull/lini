import { IsBoolean, IsIn, IsNotEmpty } from 'class-validator';

export class UserDto {
  readonly email!: string;
  readonly theme!: 'auto' | 'light' | 'dark';
  readonly dataSaving!: boolean;
  readonly notifications!: boolean;
  readonly dateCreated!: string;
  readonly dateModified!: string;
}

export class UserUpdateDto {
  @IsIn(['auto', 'light', 'dark'])
  @IsNotEmpty()
  readonly theme!: 'auto' | 'light' | 'dark';
  @IsBoolean()
  @IsNotEmpty()
  readonly dataSaving!: boolean;
  @IsBoolean()
  @IsNotEmpty()
  readonly notifications!: boolean;
}
