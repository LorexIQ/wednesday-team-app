import { Module } from '@nestjs/common';
import { RequestTripsController } from './request-trips.controller';
import { RequestTripsService } from './request-trips.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {RequestTrip} from "./request-trips.model";
import {TripsModule} from "../trips/trips.module";
import {Trip} from "../trips/trips.model";

@Module({
  controllers: [RequestTripsController],
  providers: [RequestTripsService],
  imports: [
      SequelizeModule.forFeature([User, RequestTrip, Trip]),
      TripsModule
  ]
})
export class RequestTripsModule {}
