import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsNotEmpty, IsNumber, Length} from "class-validator";

export class TripDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({default: 53.251605})
    from: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({default: 34.374174})
    to: number;

    @IsNotEmpty()
    @IsDate()
    @ApiProperty({default: new Date()})
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    @Length(1, 4)
    @ApiProperty({default: 2, minimum: 1, maximum: 4})
    places: number;
}