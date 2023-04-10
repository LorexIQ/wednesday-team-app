import {ApiProperty} from "@nestjs/swagger";

export class MeTripErrorDto {
    @ApiProperty({default: 400})
    statusCode: number;

    @ApiProperty({default: 'Пользователь не имеет активной поездки'})
    message: string;
}