import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {TripDto} from "./dto/trip.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Trip} from "./trips.model";
import {User} from "../users/users.model";

@Injectable()
export class TripsService {
    constructor(@InjectModel(Trip) private tripsModel: typeof Trip) {}

    async createTrip(tripDto: TripDto, user: User): Promise<Trip> {
        if (user.selfTripId)
            throw new HttpException("Пользователь уже имеет поездку", HttpStatus.BAD_REQUEST);
        const trip = await this.tripsModel.create({...tripDto, driverId: user.id});
        await trip.save();
        await user.update({selfTripId: trip.id});
        return this.getTripById(trip.id);
    }
    async getTrips(): Promise<Trip[]> {
        return await this.tripsModel.findAll({include: {all: true}});
    }
    async getTripById(id: number): Promise<Trip> {
        return await this.tripsModel.findOne({
            where: {id},
            include: [{all: true, attributes: {exclude: ['password']}}],
            attributes: {
                exclude: ['password']
            }
        });
    }
    async deleteTrip(user: User): Promise<void> {
        if (!user.selfTripId)
            throw new HttpException('Поездка пользователя не найдена', HttpStatus.BAD_REQUEST);
        const trip = await this.getTripById(user.selfTripId);
        await trip.$set('passengers', []);
        user.selfTripId = null;
        await user.save();
        await trip.destroy();
        return;
    }

    async joinTrip(id: number, user: User): Promise<Trip> {
        const trip = await this.getTripById(id);
        if (!trip)
            throw new HttpException('Поездка не найдена', 400);
        else if (trip.complected)
            throw new HttpException('В машине нет мест', 401);
        else if (this.isUserInTripPassengers(user, trip))
            throw new HttpException('Вы уже являетесь пассажиром', 402);
        else if (user.selfTripId)
            throw new HttpException('Вы являетесь водителем', 403);
        await trip.$add('passengers', user.id);
        await trip.reload();
        return trip;
    }
    async leaveTrip(user: User): Promise<void> {
        if (user.selfTripId)
            throw new HttpException('Вы являетесь водителем', HttpStatus.BAD_REQUEST);
        else if (!user.passengersId)
            throw new HttpException('Вы не являеетесь пассажиром', HttpStatus.BAD_REQUEST);
        const trip = await this.getTripById(user.passengersId);
        await trip.$remove('passengers', user.id);
        return;
    }

    private isUserInTripPassengers(user: User, trip: Trip): Boolean {
        return trip.passengers.some(us => us.id === user.id);
    }
}
