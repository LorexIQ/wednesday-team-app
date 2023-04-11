import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {RequestTripsService} from "./request-trips.service";
import {UserData} from "../users/decorator/user-data.decorator";
import {User} from "../users/users.model";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtGuard} from "../auth/guard";
import {CreateReqDto} from "./dto/create-req.dto";
import {RequestTrip} from "./request-trips.model";
import {Trip} from "../trips/trips.model";
import {CreateReqTripError1Dto, CreateReqTripError2Dto} from "../swagger/create-req-trip-error.dto";
import {MeReqTripErrorDto} from "../swagger/me-req-trip-error.dto";
import {
    AcceptReqTripError1Dto,
    AcceptReqTripError2Dto,
    AcceptReqTripError3Dto
} from "../swagger/accept-req-trip-error.dto";
import {FindDto} from "./dto/find.dto";
import {FoundTripDto} from "./dto/found-trip.dto";

@UseGuards(JwtGuard)
@ApiTags('Запросы на поездку')
@Controller('request-trips')
export class RequestTripsController {
    constructor(private reqTripsService: RequestTripsService) {}

    @ApiOperation({summary: 'Создать запрос на поездку'})
    @ApiBody({ type: CreateReqDto })
    @ApiResponse({ type: RequestTrip, status: 200})
    @ApiResponse({ type: CreateReqTripError1Dto, status: 400})
    @ApiResponse({ type: CreateReqTripError2Dto, status: 401})
    @Post('create')
    async createReqTrip(@Body() createReqTrip: CreateReqDto, @UserData() user: User): Promise<RequestTrip> {
        return await this.reqTripsService.createReqTrip(createReqTrip, user);
    }

    @ApiOperation({summary: 'Список всех запросов на поездку'})
    @ApiResponse({ type: [RequestTrip], status: 200})
    @Get('all')
    async getAllReqTrips(): Promise<RequestTrip[]> {
        return await this.reqTripsService.getAllReqTrips();
    }

    @ApiOperation({summary: 'Поиск запросов на поездку в радиусе начальной и конечной точек'})
    @ApiBody({type: FindDto})
    @ApiResponse({ type: [FoundTripDto], status: 200})
    @Post('find')
    async getReqTripsInZone(@Body() findDto: FindDto): Promise<FoundTripDto[]> {
        return await this.reqTripsService.getReqTripsInZone(findDto)
    }

    @ApiOperation({summary: 'Получить текущий запрос пользователя на поездку'})
    @ApiResponse({ type: RequestTrip, status: 200})
    @ApiResponse({ type: MeReqTripErrorDto, status: 400})
    @Get('me')
    async getMeReqTrip(@UserData() user: User): Promise<RequestTrip> {
        return await this.reqTripsService.getMeReqTrip(user);
    }

    @ApiOperation({summary: 'Удалить текущий запрос пользователя на поездку'})
    @ApiResponse({ type: Object, status: 200})
    @ApiResponse({ type: MeReqTripErrorDto, status: 400})
    @Delete('me')
    async deleteMeReqTrip(@UserData() user: User): Promise<void> {
        return await this.reqTripsService.deleteMeReqTrip(user);
    }

    @ApiOperation({summary: 'От лица водителя, принять запрос пользователя на поездку'})
    @ApiResponse({ type: Trip, status: 200})
    @ApiResponse({ type: AcceptReqTripError1Dto, status: 400})
    @ApiResponse({ type: AcceptReqTripError2Dto, status: 401})
    @ApiResponse({ type: AcceptReqTripError3Dto, status: 402})
    @Patch('accept/:id')
    async acceptReqTrip(@UserData() user: User, @Param('id') id: number): Promise<Trip> {
        return await this.reqTripsService.acceptReqTrip(user, id);
    }
}
