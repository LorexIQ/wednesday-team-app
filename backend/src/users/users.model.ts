import {BelongsTo, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import {Trip} from "../trips/trips.model";

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

  @ApiProperty({default: '$2a$10$K7Js7Q...', minimum: 8, maximum: 20})
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({default: () => Trip})
  @ForeignKey(() => Trip)
  @Column({type: DataType.INTEGER})
  selfTripId: number;

  @ApiProperty({default: () => Trip})
  @ForeignKey(() => Trip)
  @Column({type: DataType.INTEGER})
  tripId: number;

  @ApiProperty({default: null, required: false})
  @Column({type: DataType.INTEGER})
  addPassengers: number;

  @HasOne(() => Trip)
  selfTrip: Trip;

  @BelongsTo(() => Trip)
  participantTrip: Trip;

  @ApiProperty({default: new Date()})
  createdAt: Date;

  @ApiProperty({default: new Date()})
  updatedAt: Date;
}