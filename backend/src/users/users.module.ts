import { Module } from "@nestjs/common";
import { UsersService } from './users.service';
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./users.model";
import {Trip} from "../trips/trips.model";

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Trip])
  ],
  exports: [UsersService]
})
export class UsersModule {}
