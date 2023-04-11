import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {RequestTripsService} from "./request-trips.service";
import {UserData} from "../users/decorator/user-data.decorator";
import {User} from "../users/users.model";
import {ApiTags} from "@nestjs/swagger";
import {JwtGuard} from "../auth/guard";
import {CreateReqDto} from "./dto/create-req.dto";
import {RequestTrip} from "./request-trips.model";

@UseGuards(JwtGuard)
@ApiTags('Запросы на поездку')
@Controller('request-trips')
export class RequestTripsController {
    constructor(private reqTripsService: RequestTripsService) {}

    @Post('create')
    async createReqTrip(@Body() createReqTrip: CreateReqDto, @UserData() user: User): Promise<RequestTrip> {
        return await this.reqTripsService.createReqTrip(createReqTrip, user);
    }
    @Get('all')
    async getAllReqTrips(): Promise<RequestTrip[]> {
        return await this.reqTripsService.getAllReqTrips();
    }
    @Get('me')
    async getMeReqTrip(@UserData() user: User): Promise<RequestTrip> {
        return await this.reqTripsService.getMeReqTrip(user);
    }
    @Delete('me')
    async deleteMeReqTrip(@UserData() user: User): Promise<void> {
        return await this.reqTripsService.deleteMeReqTrip(user);
    }
    @Patch('accept/:id')
    async acceptReqTrip(@UserData() user: User, @Param('id') id: number) {
        return await this.reqTripsService.acceptReqTrip(user, id);
    }
}
