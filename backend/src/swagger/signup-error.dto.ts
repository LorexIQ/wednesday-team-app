import { ApiProperty } from "@nestjs/swagger";

export class SignupErrorDto {
  @ApiProperty({default: 'Пользователь с такими данными уже существует'})
  message: string;

  @ApiProperty({default: ['email', 'phone']})
  errors: Array<string>
}