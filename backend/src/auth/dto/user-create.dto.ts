import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length} from "class-validator";

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({default: 'example@test.ru'})
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({default: 'Иванов Иван Иванович'})
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('RU')
  @ApiProperty({default: '79009009090', description: 'Номер телефона в формате RU'})
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @ApiProperty({default: '$2a$10$K7Js7Q...', minimum: 8, maximum: 20})
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({default: 'cLssuU3gT5uWYJCwkK9r4l:APA...'})
  deviceToken?: string;
}