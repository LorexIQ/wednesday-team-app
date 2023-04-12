import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import {UsersModule} from "../users/users.module";
import {SequelizeModule} from "@nestjs/sequelize";
import {Car} from "./cars.model";
import {User} from "../users/users.model";
import {Trip} from "../trips/trips.model";

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [
      SequelizeModule.forFeature([User, Car, Trip]),
      UsersModule
  ]
})
export class CarsModule {}
