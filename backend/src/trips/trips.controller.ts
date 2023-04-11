import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {TripsService} from "./trips.service";
import {JwtGuard} from "../auth/guard";
import {User} from "../users/users.model";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TripDto} from "./dto/trip.dto";
import {CreateTripErrorDto} from "../swagger/create-trip-error.dto";
import {Trip} from "./trips.model";
import {DeleteTripErrorDto} from "../swagger/delete-trip-error.dto";
import {
    JoinTripError1Dto,
    JoinTripError2Dto,
    JoinTripError3Dto,
    JoinTripError4Dto
} from "../swagger/join-trip-error.dto";
import {LeaveTripError1Dto, LeaveTripError2Dto} from "../swagger/leave-trip-error.dto";
import {AddPassengersDto} from "./dto/add-passengers.dto";
import {MeTripErrorDto} from "../swagger/me-trip-error.dto";
import {UserData} from "../users/decorator/user-data.decorator";

@UseGuards(JwtGuard)
@ApiTags('Поездки')
@Controller('trips')
export class TripsController {
    constructor(private tripsService: TripsService) {}

    @ApiOperation({summary: 'Создать поездку'})
    @ApiBody({ type: TripDto })
    @ApiResponse({ type: Trip, status: 200})
    @ApiResponse({ type: CreateTripErrorDto, status: 400})
    @Post()
    createTrip(@Body() tripDto: TripDto, @UserData() user: User): Promise<Trip> {
        return this.tripsService.createTrip(tripDto, user);
    }

    @ApiOperation({summary: 'Получить все поездки'})
    @ApiResponse({ type: [Trip], status: 200})
    @Get()
    getTrips(): Promise<Trip[]> {
        return this.tripsService.getTrips();
    }

    @ApiOperation({summary: 'Возвращает активную поездку'})
    @ApiResponse({ type: Trip, status: 200})
    @ApiResponse({ type: MeTripErrorDto, status: 400})
    @Get('me')
    getMeTrip(@UserData() user: User): Promise<Trip> {
        return this.tripsService.getMeTrip(user);
    }

    @ApiOperation({summary: 'Удалить свою поездку в качестве водителя'})
    @ApiResponse({ type: Object, status: 200})
    @ApiResponse({ type: DeleteTripErrorDto, status: 400})
    @Delete('me')
    deleteTrip(@UserData() user: User): Promise<void> {
        return this.tripsService.deleteTrip(user);
    }

    @ApiOperation({summary: 'Присоединиться к поездке'})
    @ApiResponse({ type: Trip, status: 200})
    @ApiResponse({type: JoinTripError1Dto, status: 400})
    @ApiResponse({type: JoinTripError2Dto, status: 401})
    @ApiResponse({type: JoinTripError3Dto, status: 402})
    @ApiResponse({type: JoinTripError4Dto, status: 403})
    @Patch('join/:id')
    async joinTrip(@Param('id') id: number,
                   @Body() addPassengersDto: AddPassengersDto,
                   @UserData() user: User) {
        return await this.tripsService.joinTrip(id, addPassengersDto, user);
    }

    @ApiOperation({summary: 'Покинуть поездку'})
    @ApiResponse({ type: Object, status: 200})
    @ApiResponse({type: LeaveTripError1Dto, status: 400})
    @ApiResponse({type: LeaveTripError2Dto, status: 401})
    @Patch('leave')
    async leaveTrip(@UserData() user: User) {
        return this.tripsService.leaveTrip(user);
    }

}
