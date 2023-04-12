import { ApiProperty } from "@nestjs/swagger";

export class RegCarErrorDto {
    @ApiProperty({default: 400})
    statusCode: number;

    @ApiProperty({default: 'Машина с таким номером уже зарегистрирована'})
    message: string;
}