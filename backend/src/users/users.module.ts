import { Module } from "@nestjs/common";
import { UsersService } from './users.service';
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import {Trip} from "../trips/trips.model";
import {Car} from "../cars/cars.model";
import {RequestTrip} from "../request-trips/request-trips.model";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Trip, Car, RequestTrip])
  ],
  exports: [UsersService]
})
export class UsersModule {}
