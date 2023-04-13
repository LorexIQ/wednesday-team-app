import {ApiProperty} from "@nestjs/swagger";
import {User} from "../../users/users.model";

export class FoundTripDto {
    @ApiProperty({default: 1})
    id: number;

    @ApiProperty({default: '53.251605|53.251605'})
    from: string;

    @ApiProperty({default: '53.251605|53.251605'})
    to: string;

    @ApiProperty({default: new Date()})
    date: Date;

    @ApiProperty({default: 2, minimum: 1, maximum: 4})
    places: number;

    @ApiProperty({default: 1, minimum: 0, maximum: 4})
    placesIsFilled: number;

    @ApiProperty({default: false})
    complected: boolean;

    @ApiProperty({default: 0})
    driverId: number;

    @ApiProperty({type: () => User})
    driver: User;

    @ApiProperty({type: () => User, isArray: true})
    passengers: User[]

    @ApiProperty({default: 1.2})
    fromDistance: number;

    @ApiProperty({default: 1.2})
    toDistance: number;
}