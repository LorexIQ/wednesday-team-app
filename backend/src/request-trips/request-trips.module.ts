import { Module } from '@nestjs/common';
import { RequestTripsController } from './request-trips.controller';
import { RequestTripsService } from './request-trips.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {RequestTrip} from "./request-trips.model";

@Module({
  controllers: [RequestTripsController],
  providers: [RequestTripsService],
  imports: [
      SequelizeModule.forFeature([User, RequestTrip])
  ]
})
export class RequestTripsModule {}
