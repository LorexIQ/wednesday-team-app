import {ApiProperty} from "@nestjs/swagger";

export class DeleteTripErrorDto {
    @ApiProperty({default: 400})
    statusCode: number;

    @ApiProperty({default: 'Поездка пользователя не найдена'})
    message: string;
}