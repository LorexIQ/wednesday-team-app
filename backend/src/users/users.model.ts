import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface UserCreationAttrs {
  email: string;
  name: string;
  phone: string;
  password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({default: 1})
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

  @ApiProperty({default: new Date()})
  createdAt: Date;

  @ApiProperty({default: new Date()})
  updatedAt: Date;
}