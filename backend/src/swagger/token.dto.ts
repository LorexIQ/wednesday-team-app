import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {
  @ApiProperty({default: 'eyJhbGciOiJIUzI...'})
  token: string;
}