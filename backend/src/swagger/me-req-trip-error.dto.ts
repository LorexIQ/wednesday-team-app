import { ApiProperty } from '@nestjs/swagger';

export class MeReqTripErrorDto {
    @ApiProperty({default: 400})
    statusCode: number;

    @ApiProperty({default: 'Пользователь не имеет запроса на поездку'})
    message: string;
}