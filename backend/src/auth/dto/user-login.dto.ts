import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length} from "class-validator";

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('RU')
  @ApiProperty({default: '79009009090', description: 'Номер телефона в формате RU'})
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @ApiProperty({default: 'password', minimum: 8, maximum: 20})
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({default: 'cLssuU3gT5uWYJCwkK9r4l:APA...', required: false})
  deviceToken?: string;
}