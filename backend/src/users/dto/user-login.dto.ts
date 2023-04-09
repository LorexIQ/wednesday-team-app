import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator";

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
}