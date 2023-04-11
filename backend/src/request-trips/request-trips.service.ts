import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RequestTrip} from "./request-trips.model";
import {User} from "../users/users.model";

@Injectable()
export class RequestTripsService {
    constructor(@InjectModel(RequestTrip) private requestTripsModel) {}

    async createRequestTrip(user: User) {
        return;
    }
}
