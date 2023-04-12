import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {ApiProperty} from "@nestjs/swagger";

interface TripCreationAttrs {
    from: string;
    to: string;
    date: Date;
    places: number;
    driverId: number;
}

@Table({tableName: 'trips'})
export class Trip extends Model<Trip, TripCreationAttrs> {
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

    @ApiProperty({default: 2, minimum: 1, maximum: 4})
    @Column({type: DataType.INTEGER, allowNull: false})
    places: number;

    @ApiProperty({default: 1, minimum: 0, maximum: 4})
    @Column({type: DataType.INTEGER, defaultValue: 0})
    placesIsFilled: number;

    @ApiProperty({default: false})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    complected: boolean;

    @ApiProperty({default: 0})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: true, allowNull: null})
    driverId: number;

    @ApiProperty({type: () => User})
    @BelongsTo(() => User, 'driverId')
    driver: User;

    @ApiProperty({type: () => User, isArray: true})
    @HasMany(() => User, 'tripId')
    passengers: User[]
}