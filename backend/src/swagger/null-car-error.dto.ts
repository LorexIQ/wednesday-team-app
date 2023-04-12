import { ApiProperty } from "@nestjs/swagger";

export class NullCarErrorDto {
    @ApiProperty({default: 400})
    statusCode: number;

    @ApiProperty({default: 'Пользователь не имеет машины'})
    message: string;
}