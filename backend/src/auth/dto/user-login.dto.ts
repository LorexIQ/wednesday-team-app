import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsOptional, IsString, Length} from "class-validator";

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({default: 'example@test.ru'})
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @ApiProperty({default: 'password', minimum: 8, maximum: 20})
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({default: 'cLssuU3gT5uWYJCwkK9r4l:APA...'})
  deviceToken?: string;
}