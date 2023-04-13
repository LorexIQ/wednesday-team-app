import {ApiProperty} from "@nestjs/swagger";

export class FindReqTripsErrorDto {
    @ApiProperty({default: 400})
    statusCode: number;

    @ApiProperty({default: 'Вы не являетесь водителем'})
    message: string;
}