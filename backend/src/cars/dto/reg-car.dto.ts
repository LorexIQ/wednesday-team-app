import {ApiProperty} from "@nestjs/swagger";
import {IsHexColor, IsString, Length} from "class-validator";

export class RegCarDto {
    @IsString()
    @Length(8, 8)
    @ApiProperty({default: 'A000AA00', minimum: 8, maximum: 8})
    stateNumber: string;

    @IsString()
    @ApiProperty({default: 'ВАЗ'})
    manufacturer: string;

    @IsString()
    @ApiProperty({default: '1111'})
    model: string;

    @IsString()
    @ApiProperty({default: 'Седан'})
    body: string;

    @IsHexColor()
    @ApiProperty({default: '#000000'})
    color: string;
}