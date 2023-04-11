import { ApiProperty } from '@nestjs/swagger';

export class CreateReqTripError1Dto {
    @ApiProperty({default: 400})
    statusCode: number;

    @ApiProperty({default: 'Пользователь уже имеет поездку'})
    message: string;
}

export class CreateReqTripError2Dto {
    @ApiProperty({default: 401})
    statusCode: number;

    @ApiProperty({default: 'Пользователь уже имеет запрос на поездку'})
    message: string;
}
