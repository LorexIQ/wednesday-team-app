import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto {
  @ApiProperty({default: 'example@test.ru'})
  email: string;

  @ApiProperty({default: 'Иванов Иван Иванович'})
  name: string;

  @ApiProperty({default: '79009009090'})
  phone: string;

  @ApiProperty({default: '$2a$10$K7Js7Q...'})
  password: string;
}