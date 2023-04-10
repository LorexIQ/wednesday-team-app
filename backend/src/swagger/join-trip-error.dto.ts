import {ApiProperty} from "@nestjs/swagger";

export class JoinTripError1Dto {
    @ApiProperty({default: 400})
    statusCode: number;

    @ApiProperty({default: 'Поездка не найдена'})
    message: string;
}

export class JoinTripError2Dto {
    @ApiProperty({default: 401})
    statusCode: number;

    @ApiProperty({default: 'В машине нет мест'})
    message: string;
}

export class JoinTripError3Dto {
    @ApiProperty({default: 402})
    statusCode: number;

    @ApiProperty({default: 'Вы уже являетесь пассажиром'})
    message: string;
}

export class JoinTripError4Dto {
    @ApiProperty({default: 403})
    statusCode: number;

    @ApiProperty({default: 'Вы являетесь водителем'})
    message: string;
}