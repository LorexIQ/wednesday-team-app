import {ApiProperty} from "@nestjs/swagger";

export class LeaveTripError1Dto {
    @ApiProperty({default: 400})
    statusCode: number;

    @ApiProperty({default: 'Вы являетесь водителем'})
    message: string;
}

export class LeaveTripError2Dto {
    @ApiProperty({default: 401})
    statusCode: number;

    @ApiProperty({default: 'Вы не являеетесь пассажиром'})
    message: string;
}