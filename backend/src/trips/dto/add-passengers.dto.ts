import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, Max, Min} from "class-validator";

export class AddPassengersDto {
    @IsOptional()
    @Min(1)
    @Max(4)
    @ApiProperty({default: null, required: false})
    addPassengers?: number;
}