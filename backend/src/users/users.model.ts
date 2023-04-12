import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {Trip} from "../trips/trips.model";
import {Car} from "../cars/cars.model";
import {RequestTrip} from "../request-trips/request-trips.model";

interface UserCreationAttrs {
  email: string;
  name: string;
  phone: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({default: 0})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({default: "example@test.ru"})
  @Column({type: DataType.STRING, allowNull: false, unique: true})
  email: string;

  @ApiProperty({default: "Иванов Иван Иванович"})
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @ApiProperty({default: "1234567890"})
  @Column({type: DataType.STRING, allowNull: false, unique: true})
  phone: string;

  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({default: null, required: false})
  @Column({type: DataType.INTEGER})
  addPassengers: number;

  @ApiProperty({default: 0})
  @ForeignKey(() => Trip)
  @Column({type: DataType.INTEGER})
  selfTripId: number;

  @ApiProperty({default: 0})
  @ForeignKey(() => Trip)
  @Column({type: DataType.INTEGER})
  tripId: number;

  @ApiProperty({default: 0})
  @ForeignKey(() => Car)
  @Column({type: DataType.INTEGER})
  carId: number;

  @ApiProperty({default: 0})
  @ForeignKey(() => RequestTrip)
  @Column({type: DataType.INTEGER})
  requestTripId: number;

  @ApiProperty({type: () => Trip})
  @HasOne(() => Trip)
  selfTrip: Trip;

  @ApiProperty({type: () => Trip})
  @BelongsTo(() => Trip, 'tripId')
  trip: Trip;

  @ApiProperty({type: () => Car})
  @HasOne(() => Car)
  car: Car;

  @ApiProperty({type: () => RequestTrip})
  @HasOne(() => RequestTrip)
  requestTrip: RequestTrip;

  @ApiProperty({default: new Date()})
  createdAt: Date;

  @ApiProperty({default: new Date()})
  updatedAt: Date;
}