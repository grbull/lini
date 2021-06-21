import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class AuthLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;
}

export class AuthValidateDto {
  @IsUUID()
  @IsNotEmpty()
  token!: string;
}
