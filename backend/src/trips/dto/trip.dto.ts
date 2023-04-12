import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString, Max, Min} from "class-validator";

export class TripDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({default: '53.251605|53.251605'})
    from: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({default: '53.251605|53.251605'})
    to: string;

    @IsNotEmpty()
    @ApiProperty({default: new Date()})
    date: Date;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(4)
    @ApiProperty({default: 2, minimum: 1, maximum: 4})
    places: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({default: 1000, minimum: 0})
    priceForPlace: number;
}