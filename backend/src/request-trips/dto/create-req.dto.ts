import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min} from "class-validator";

export class CreateReqDto {
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
    @Min(0)
    @ApiProperty({default: 1000, minimum: 0})
    priceForPlace: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(3)
    @ApiProperty({default: 0, minimum: 0, maximum: 3})
    addPassengers: number;
}