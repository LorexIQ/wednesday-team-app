import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {ApiProperty} from "@nestjs/swagger";

interface RequestTripCreationAttrs {
    from: string;
    to: string;
    date: Date;
    addPassengers: number;
    priceForPlace: number;
    ownerId: number;
}

@Table({tableName: 'request-trips'})
export class RequestTrip extends Model<RequestTrip, RequestTripCreationAttrs> {
    @ApiProperty({default: 1})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({default: '53.251605|53.251605'})
    @Column({type: DataType.STRING, allowNull: false})
    from: string;

    @ApiProperty({default: '53.251605|53.251605'})
    @Column({type: DataType.STRING, allowNull: false})
    to: string;

    @ApiProperty({default: new Date()})
    @Column({type: DataType.DATE, allowNull: false})
    date: Date;

    @ApiProperty({default: 0, minimum: 0, maximum: 3})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    addPassengers: number;

    @ApiProperty({default: 0, minimum: 0})
    @Column({type: DataType.INTEGER, allowNull: false})
    priceForPlace: number;

    @ApiProperty({type: () => User})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: true, allowNull: null})
    ownerId: number;

    @BelongsTo(() => User, 'ownerId')
    owner: User;
}