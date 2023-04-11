import { ApiProperty } from '@nestjs/swagger';

export class AcceptReqTripError1Dto {
    @ApiProperty({default: 400})
    statusCode: number;

    @ApiProperty({default: 'Запрос на поездку не найден'})
    message: string;
}

export class AcceptReqTripError2Dto {
    @ApiProperty({default: 401})
    statusCode: number;

    @ApiProperty({default: 'Вы не являетесь водителем'})
    message: string;
}

export class AcceptReqTripError3Dto {
    @ApiProperty({default: 402})
    statusCode: number;

    @ApiProperty({default: 'В машине не хватает мест'})
    message: string;
}
