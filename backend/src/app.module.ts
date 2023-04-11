import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {UsersModule} from './users/users.module';
import {User} from "./users/users.model";
import {AuthModule} from './auth/auth.module';
import {AppController} from './app.controller';
import {TripsModule} from './trips/trips.module';
import {Trip} from "./trips/trips.model";
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler";
import {APP_GUARD} from "@nestjs/core";
import {CarsModule} from "./cars/cars.module";
import {Car} from "./cars/cars.model";
import {RequestTripsModule} from './request-trips/request-trips.module';
import {RequestTrip} from "./request-trips/request-trips.model";
import { NotifyModule } from './notify/notify.module';
import { CronModule } from './cron/cron.module';

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 20,
            limit: 10,
        }),
        ConfigModule.forRoot({
            envFilePath: `${process.env.NODE_ENV ?? ''}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST || 'localhost',
            port: +process.env.POSTGRES_PORT || 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Trip, Car, RequestTrip],
            autoLoadModels: true,
            logging: false
        }),
        UsersModule,
        AuthModule,
        TripsModule,
        CarsModule,
        RequestTripsModule,
        NotifyModule,
        CronModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ],
})
export class AppModule {
}
