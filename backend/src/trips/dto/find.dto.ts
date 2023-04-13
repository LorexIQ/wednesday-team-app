import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min} from "class-validator";

export class FindDto {
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

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(3)
    @ApiProperty({default: 0, minimum: 0, maximum: 3, required: false})
    addPassengers?: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({default: 1000, minimum: 0})
    priceForPlace: number;

    @IsNumber()
    @Min(0.05)
    @ApiProperty({default: 0.05, minimum: 0.05})
    fromRadius: number;

    @IsNumber()
    @Min(0.05)
    @ApiProperty({default: 0.05, minimum: 0.05})
    toRadius: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(24)
    @ApiProperty({default: 2, minimum: 1, maximum: 24, required: false})
    hoursPadding?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(300)
    @ApiProperty({default: 100, minimum: 0, maximum: 300, required: false})
    pricePadding?: number;
}