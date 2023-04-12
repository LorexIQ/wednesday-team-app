import {ApiProperty} from "@nestjs/swagger";

export class DeleteTripError1Dto {
    @ApiProperty({default: 400})
    statusCode: number;

    @ApiProperty({default: 'Поездка пользователя не найдена'})
    message: string;
}

export class DeleteTripError2Dto {
    @ApiProperty({default: 401})
    statusCode: number;

    @ApiProperty({default: 'Пользователь имеет запрос на поездку. Отмените его, чтобы создать свою'})
    message: string;
}