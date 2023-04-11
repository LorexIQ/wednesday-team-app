import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {TripsService} from "./trips.service";
import {JwtGuard} from "../auth/guard";
import {User} from "../users/users.model";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TripDto} from "./dto/trip.dto";
import {CreateTripErrorDto} from "../swagger/create-trip-error.dto";
import {Trip} from "./trips.model";
import {
    JoinTripError1Dto,
    JoinTripError2Dto,
    JoinTripError3Dto,
    JoinTripError4Dto, JoinTripError5Dto
} from "../swagger/join-trip-error.dto";
import {LeaveTripError1Dto, LeaveTripError2Dto} from "../swagger/leave-trip-error.dto";
import {AddPassengersDto} from "./dto/add-passengers.dto";
import {MeTripErrorDto} from "../swagger/me-trip-error.dto";
import {UserData} from "../users/decorator/user-data.decorator";
import {DeleteTripError1Dto, DeleteTripError2Dto} from "../swagger/delete-trip-error.dto";
import {FindDto} from "./dto/find.dto";
import {FoundTripDto} from "./dto/found-trip.dto";

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
    async createTrip(@Body() tripDto: TripDto, @UserData() user: User): Promise<Trip> {
        return await this.tripsService.createTrip(tripDto, user);
    }

    @ApiOperation({summary: 'Получить все поездки'})
    @ApiResponse({ type: [Trip], status: 200})
    @Get()
    async getTrips(): Promise<Trip[]> {
        return await this.tripsService.getTrips();
    }

    @ApiOperation({summary: 'Поиск поездок в радиусе начальной и конечной точек'})
    @ApiBody({type: FindDto})
    @ApiResponse({ type: [FoundTripDto], status: 200})
    @Post('find')
    async getTripsInZone(@Body() findDto: FindDto): Promise<FoundTripDto[]> {
        return await this.tripsService.getTripsInZone(findDto)
    }

    @ApiOperation({summary: 'Возвращает активную поездку'})
    @ApiResponse({ type: Trip, status: 200})
    @ApiResponse({ type: MeTripErrorDto, status: 400})
    @Get('me')
    async getMeTrip(@UserData() user: User): Promise<Trip> {
        return await this.tripsService.getMeTrip(user);
    }

    @ApiOperation({summary: 'Удалить свою поездку в качестве водителя'})
    @ApiResponse({ type: Object, status: 200})
    @ApiResponse({ type: DeleteTripError1Dto, status: 400})
    @ApiResponse({ type: DeleteTripError2Dto, status: 401})
    @Delete('me')
    async deleteTrip(@UserData() user: User): Promise<void> {
        return await this.tripsService.deleteTrip(user);
    }

    @ApiOperation({summary: 'Присоединиться к поездке'})
    @ApiResponse({ type: Trip, status: 200})
    @ApiResponse({type: JoinTripError1Dto, status: 400})
    @ApiResponse({type: JoinTripError2Dto, status: 401})
    @ApiResponse({type: JoinTripError3Dto, status: 402})
    @ApiResponse({type: JoinTripError4Dto, status: 403})
    @ApiResponse({type: JoinTripError5Dto, status: 404})
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
        return await this.tripsService.leaveTrip(user);
    }

}
