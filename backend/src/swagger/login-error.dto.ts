import { ApiProperty } from "@nestjs/swagger";

export class LoginErrorDto {
  @ApiProperty({default: 400})
  statusCode: number;

  @ApiProperty({default: 'Пользователь с такими данными не найден'})
  message: string;
}