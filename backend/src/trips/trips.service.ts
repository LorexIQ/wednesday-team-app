import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {TripDto} from "./dto/trip.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Trip} from "./trips.model";
import {User} from "../users/users.model";
import {AddPassengersDto} from "./dto/add-passengers.dto";
import {FindDto} from "./dto/find.dto";
import {FoundTripDto} from "./dto/found-trip.dto";
import compareGeoWithZoneGeo from "../utils/compareGeoWithZoneGeo";
import compareDates from "../utils/compareDates";
import geoDecode from "../utils/geoDecode";
import {NotifyService} from "../notify/notify.service";

@Injectable()
export class TripsService {
    constructor(@InjectModel(Trip) private tripsModel: typeof Trip,
                private notifyService: NotifyService) {}

    async createTrip(tripDto: TripDto, user: User): Promise<Trip> {
        if (user.selfTripId || user.tripId)
            throw new HttpException('Пользователь уже имеет поездку', 400);
        else if (user.requestTripId)
            throw new HttpException('Пользователь имеет запрос на поездку. Отмените его, чтобы создать свою', 401)
        const trip = await this.tripsModel.create({
            ...tripDto,
            driverId: user.id,
            fromName: await geoDecode(tripDto.from),
            toName: await geoDecode(tripDto.to),
        });
        await user.update({selfTripId: trip.id});
        return this.getTripById(trip.id);
    }
    async getTrips(): Promise<Trip[]> {
        return await this.tripsModel.findAll({
            include: [{all: true, attributes: {exclude: ['password']}}],
            attributes: {exclude: ['password']}
        });
    }
    async getTripsInZone(user: User, findDto: FindDto): Promise<FoundTripDto[]> {
        if (user.selfTripId || user.tripId || user.requestTripId)
            throw new HttpException('Вы не можете искать поездки. Отмените текущий поиск или поездку', HttpStatus.BAD_REQUEST);
        const trips = await this.getTrips();
        const foundTrips = trips.reduce((accum: FoundTripDto[], trip: Trip) => {
            // Совпанение геолокаций
            const [fromInZone, fromDistance] = compareGeoWithZoneGeo(trip.from, findDto.from, findDto.fromRadius);
            const [toInZone, toDistance] = compareGeoWithZoneGeo(trip.to, findDto.to, findDto.toRadius);
            // Время в диапазоне +-2 часа
            const isCurrentTime = compareDates(trip.date, new Date(findDto.date), findDto.hoursPadding ?? 2);
            // Имеются свободные места с учётом пассажиров
            const isFreePlaces = (trip.places - trip.placesIsFilled) >= findDto.addPassengers + 1;
            // Цена меньше или на [pricePadding] больше, чем ищет пользователь
            const isCurrentPrice = trip.priceForPlace <= findDto.priceForPlace ||
                trip.priceForPlace - (findDto.pricePadding ?? 200) <= findDto.priceForPlace;

            if (fromInZone && toInZone && isCurrentTime && isFreePlaces && isCurrentPrice)
                accum.push({...trip.dataValues, fromDistance, toDistance} as FoundTripDto);
            return accum;
        }, []) as FoundTripDto[];
        return foundTrips.sort((a, b) =>
            a.fromDistance === b.fromDistance
                ? a.toDistance - b.toDistance
                : a.fromDistance - b.fromDistance
        );
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

    async joinTrip(id: number, addPassengersDto: AddPassengersDto, user: User, notifyTarget?: User): Promise<Trip> {
        const trip = await this.getTripById(id);
        if (!trip)
            throw new HttpException('Поездка не найдена', 400);
        else if (user.requestTripId)
            throw new HttpException('Пользователь имеет запрос на поездку. Отмените его, чтобы присоединиться к поездке', 401);
        else if (this.isTripComplete(trip, addPassengersDto.addPassengers))
            throw new HttpException('В машине нет мест', 402);
        else if (user.tripId)
            throw new HttpException('Вы уже являетесь пассажиром', 403);
        else if (user.selfTripId)
            throw new HttpException('Вы являетесь водителем', 404);
        await user.update({addPassengers: addPassengersDto.addPassengers});
        await trip.$add('passengers', user.id);
        await trip.reload();
        await trip.update({placesIsFilled: this.getFilledTripPlaces(trip), complected: this.isTripComplete(trip)});
        await trip.reload();
        await this.notifyService.sendNotify(notifyTarget ? {
            title: 'Вас добавили в поездку 😊',
            body: 'Зайдите в приложение, чтобы узнать подробности',
            token: notifyTarget.deviceToken
        } : {
            title: 'К вам присоединился пассажир 😊',
            body: 'Зайдите в приложение, чтобы узнать подробности',
            token: trip.driver.deviceToken
        });
        return trip;
    }
    async leaveTrip(user: User): Promise<void> {
        if (user.selfTripId)
            throw new HttpException('Вы являетесь водителем', HttpStatus.BAD_REQUEST);
        else if (!user.tripId)
            throw new HttpException('Вы не являеетесь пассажиром', HttpStatus.BAD_REQUEST);
        const trip = await this.getTripById(user.tripId);
        await trip.update({placesIsFilled: trip.placesIsFilled - (1 + user.addPassengers), complected: false});
        await trip.$remove('passengers', user.id);
        await user.update({addPassengers: null});
        await this.notifyService.sendNotify({
            title: 'От вас ушел пассажир 😞',
            body: 'Зайдите в приложение, чтобы подыскать нового',
            token: trip.driver.deviceToken
        })
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
