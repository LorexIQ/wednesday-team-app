import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {TripDto} from "./dto/trip.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Trip} from "./trips.model";
import {User} from "../users/users.model";
import {AddPassengersDto} from "./dto/add-passengers.dto";

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
    async getMeTrip(user: User): Promise<Trip> {
        if (!user.selfTripId && !user.tripId)
            throw new HttpException('Пользователь не имеет активной поездки', HttpStatus.BAD_REQUEST);
        return await this.getTripById(user.selfTripId ?? user.tripId);
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
        await User.update(
            {addPassengers: null},
            {where: {id: trip.passengers.map((user: User) => user.id)}}
        );
        await trip.$set('passengers', []);
        user.selfTripId = null;
        await user.save();
        await trip.destroy();
        return;
    }

    async joinTrip(id: number, addPassengersDto: AddPassengersDto, user: User): Promise<Trip> {
        const trip = await this.getTripById(id);
        if (!trip)
            throw new HttpException('Поездка не найдена', 400);
        else if (this.isTripComplete(trip, addPassengersDto.addPassengers))
            throw new HttpException('В машине нет мест', 401);
        else if (this.isUserInTripPassengers(user, trip))
            throw new HttpException('Вы уже являетесь пассажиром', 402);
        else if (user.selfTripId)
            throw new HttpException('Вы являетесь водителем', 403);
        await user.update({addPassengers: addPassengersDto.addPassengers});
        await trip.$add('passengers', user.id);
        await trip.reload();
        await trip.update({placesIsFilled: this.getFilledTripPlaces(trip), complected: this.isTripComplete(trip)})
        return trip;
    }
    async leaveTrip(user: User): Promise<void> {
        if (user.selfTripId)
            throw new HttpException('Вы являетесь водителем', HttpStatus.BAD_REQUEST);
        else if (!user.tripId)
            throw new HttpException('Вы не являеетесь пассажиром', HttpStatus.BAD_REQUEST);
        const trip = await this.getTripById(user.tripId);
        await trip.$remove('passengers', user.id);
        await user.update({addPassengers: null});
        return;
    }

    private getFilledTripPlaces(trip: Trip) {
        return trip.passengers.reduce((accum: number, user: User): number => accum + user.addPassengers + 1, 0);
    };
    private isUserInTripPassengers(user: User, trip: Trip): Boolean {
        return trip.passengers.some(us => us.id === user.id);
    }
    private isTripComplete(trip: Trip, addPassengers?: number) {
        if (addPassengers) {
            return this.getFilledTripPlaces(trip) + addPassengers + 1 > trip.places;
        } else {
            return this.getFilledTripPlaces(trip) >= trip.places;
        }
    }
}
