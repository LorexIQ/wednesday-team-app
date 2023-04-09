import { ApiProperty } from "@nestjs/swagger";

export class UserLoginDto {
  @ApiProperty({default: 'example@test.ru'})
  email: string;

  @ApiProperty({default: 'password'})
  password: string;
}