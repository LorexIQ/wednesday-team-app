import {ApiProperty} from "@nestjs/swagger";

export class FindTripErrorDto {
    @ApiProperty({default: 400})
    statusCode: number;

    @ApiProperty({default: 'Вы не можете искать поездки. Отмените текущий поиск или поездку'})
    message: string;
}