import {Body, Controller, Delete, Get, Post, Req, UseGuards} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CarsService} from "./cars.service";
import {RegCarDto} from "./dto/reg-car.dto";
import {User} from "../users/users.model";
import {JwtGuard} from "../auth/guard";
import {Request} from "express";
import {Car} from "./cars.model";
import {RegCarErrorDto} from "../swagger/reg-car-error.dto";
import {NullCarErrorDto} from "../swagger/null-car-error.dto";

@UseGuards(JwtGuard)
@ApiTags('Автомобили')
@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService) {}

    @ApiOperation({summary: 'Создать автомобиль'})
    @ApiBody({ type: RegCarDto })
    @ApiResponse({ type: Car, status: 200})
    @ApiResponse({ type: RegCarErrorDto, status: 400})
    @Post('reg')
    async regCar(@Body() regCarDto: RegCarDto, @Req() req: Request): Promise<Car> {
        return await this.carsService.regCar(regCarDto, req.user as User);
    }

    @ApiOperation({summary: 'Получить сведенья об автомобиле'})
    @ApiResponse({ type: Car, status: 200})
    @ApiResponse({ type: NullCarErrorDto, status: 400})
    @Get('me')
    async getMeCar(@Req() req: Request): Promise<Car> {
        return await this.carsService.getMeCar(req.user as User);
    }

    @ApiOperation({summary: 'Удалить свой автомобиль'})
    @ApiResponse({ type: Object, status: 200})
    @ApiResponse({ type: NullCarErrorDto, status: 400})
    @Delete('me')
    async delMeCar(@Req() req: Request): Promise<void> {
        return await this.carsService.delMeCar(req.user as User);
    }
}
