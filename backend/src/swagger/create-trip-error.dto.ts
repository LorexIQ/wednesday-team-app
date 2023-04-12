import { ApiProperty } from '@nestjs/swagger';

export class CreateTripErrorDto {
    @ApiProperty({default: 400})
    statusCode: number;

    @ApiProperty({default: 'Пользователь уже имеет поездку'})
    message: string;
}