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

    @ApiProperty({default: 0, minimum: 0, maximum: 3})
    addPassengers: number;

    @ApiProperty({default: 0, minimum: 0})
    priceForPlace: number;

    @ApiProperty({default: 0})
    ownerId: number;

    @ApiProperty({type: () => User})
    owner: User;

    @ApiProperty({default: 1.2})
    fromDistance: number;

    @ApiProperty({default: 1.2})
    toDistance: number;
}