import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RequestTrip} from "./request-trips.model";
import {User} from "../users/users.model";
import {CreateReqDto} from "./dto/create-req.dto";
import {Trip} from "../trips/trips.model";
import {TripsService} from "../trips/trips.service";
import compareGeoWithZoneGeo from "../utils/compareGeoWithZoneGeo";
import compareDates from "../utils/compareDates";
import {FindDto} from "./dto/find.dto";
import {FoundTripDto} from "./dto/found-trip.dto";

@Injectable()
export class RequestTripsService {
    constructor(@InjectModel(RequestTrip) private reqTripsModel: typeof RequestTrip,
                private tripsService: TripsService) {}

    async createReqTrip(createReqDto: CreateReqDto, user: User): Promise<RequestTrip> {
        if (user.tripId || user.selfTripId)
            throw new HttpException('Пользователь уже имеет поездку', 400);
        else if (user.requestTripId)
            throw new HttpException('Пользователь уже имеет запрос на поездку', 401);
        const reqTrip = await this.reqTripsModel.create({...createReqDto, ownerId: user.id});
        await user.update({requestTripId: reqTrip.id});
        return this.getReqTripById(reqTrip.id);
    }
    async getAllReqTrips(): Promise<RequestTrip[]> {
        return await this.reqTripsModel.findAll({
            include: {all: true, attributes: {exclude: ['password']}}
        });
    }
    async getReqTripsInZone(findDto: FindDto): Promise<FoundTripDto[]> {
        const reqTrips = await this.getAllReqTrips();
        const foundTrips = reqTrips.reduce((accum: FoundTripDto[], reqTrip: RequestTrip) => {
            // Совпанение геолокаций
            const [fromInZone, fromDistance] = compareGeoWithZoneGeo(reqTrip.from, findDto.from, findDto.fromRadius);
            const [toInZone, toDistance] = compareGeoWithZoneGeo(reqTrip.to, findDto.to, findDto.toRadius);
            // Время в диапазоне +-2 часа
            const isCurrentTime = compareDates(reqTrip.date, new Date(findDto.date), findDto.hoursPadding ?? 2);
            // Имеются свободные места с учётом пассажиров
            const isFreePlaces = reqTrip.addPassengers + 1 === findDto.passengers;
            // Цена меньше чем ищет водитель
            const isCurrentPrice = reqTrip.priceForPlace <= findDto.priceForPlace;

            if (fromInZone && toInZone && isCurrentTime && isFreePlaces && isCurrentPrice)
                accum.push({...reqTrip.dataValues, fromDistance, toDistance} as FoundTripDto);
            return accum;
        }, []) as FoundTripDto[];
        return foundTrips.sort((a, b) =>
            a.fromDistance === b.fromDistance
                ? a.toDistance - b.toDistance
                : a.fromDistance - b.fromDistance
        );
    }
    async getMeReqTrip(user: User): Promise<RequestTrip> {
        if (!user.requestTripId)
            throw new HttpException('Пользователь не имеет запроса на поездку', HttpStatus.BAD_REQUEST)
        return this.getReqTripById(user.requestTripId);
    }
    async deleteMeReqTrip(user: User): Promise<void> {
        if (!user.requestTripId)
            throw new HttpException('Пользователь не имеет запроса на поездку', HttpStatus.BAD_REQUEST)
        await this.reqTripsModel.destroy({where: {id: user.requestTripId}});
        await user.update({requestTripId: null});
        return;
    }
    async acceptReqTrip(user: User, id: number): Promise<Trip> {
        const reqTrip = await this.getReqTripById(id);
        if (!reqTrip)
            throw new HttpException('Запрос на поездку не найден', 400)
        else if (!user.selfTripId)
            throw new HttpException('Вы не являетесь водителем', 401)
        const trip = user.selfTrip as Trip;
        if (trip.complected || trip.placesIsFilled + 1 + reqTrip.addPassengers > trip.places)
            throw new HttpException('В машине не хватает мест', 402)
        const {addPassengers, owner} = reqTrip;
        await this.deleteReqByTrip(reqTrip.id);
        await owner.reload();
        return await this.tripsService.joinTrip(trip.id, {addPassengers}, owner);
    }

    private async getReqTripById(id: number): Promise<RequestTrip> {
        return await this.reqTripsModel.findOne({
            where: {id},
            include: {all: true, attributes: {exclude: ['password']}}
        });
    }
    private async deleteReqByTrip(id: number): Promise<void> {
        const reqTrip = await this.getReqTripById(id);
        await reqTrip.owner.update({requestTripId: null});
        await reqTrip.destroy();
        return;
    }
}
