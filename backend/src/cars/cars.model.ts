import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

interface CarCreationAttrs {
    stateNumber: string;
    manufacturer: string;
    model: string;
    body: string;
    color: string;
    ownerId: number;
}

@Table({tableName: 'cars'})
export class Car extends Model<Car, CarCreationAttrs> {
    @ApiProperty({default: 0})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({default: 'A000AA00', minimum: 8, maximum: 8})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    stateNumber: string;

    @ApiProperty({default: 'ВАЗ'})
    @Column({type: DataType.STRING, allowNull: false})
    manufacturer: string;

    @ApiProperty({default: '1111'})
    @Column({type: DataType.STRING, allowNull: false})
    model: string;

    @ApiProperty({default: 'Седан'})
    @Column({type: DataType.STRING, allowNull: false})
    body: string;

    @ApiProperty({default: '#000000'})
    @Column({type: DataType.STRING, allowNull: false})
    color: string;

    @ApiProperty({type: () => User})
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, unique: true, allowNull: null})
    ownerId: number;

    @BelongsTo(() => User, 'ownerId')
    owner: User;
}