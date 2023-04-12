import { ApiProperty } from "@nestjs/swagger";

export class PingDto {
  @ApiProperty({default: 'pong'})
  message: string;
}