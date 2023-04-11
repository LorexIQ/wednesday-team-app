import {Controller, Post, UseGuards} from '@nestjs/common';
import {RequestTripsService} from "./request-trips.service";
import {UserData} from "../users/decorator/user-data.decorator";
import {User} from "../users/users.model";
import {ApiTags} from "@nestjs/swagger";
import {JwtGuard} from "../auth/guard";

@UseGuards(JwtGuard)
@ApiTags('Запросы на поездку')
@Controller('request-trips')
export class RequestTripsController {
    constructor(private requestTripsService: RequestTripsService) {}

    @Post('create')
    async createRequestTrip(@UserData() user: User) {
        return this.requestTripsService.createRequestTrip(user);
    }
}
