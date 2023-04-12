import {Module} from '@nestjs/common';
import {TripsController} from './trips.controller';
import {TripsService} from './trips.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Trip} from "./trips.model";

@Module({
    controllers: [TripsController],
    providers: [TripsService],
    imports: [
        SequelizeModule.forFeature([User, Trip])
    ],
    exports: [
        TripsService
    ]
})
export class TripsModule {
}
