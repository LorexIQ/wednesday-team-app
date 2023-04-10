import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { User } from "./users/users.model";
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { TripsModule } from './trips/trips.module';
import {Trip} from "./trips/trips.model";

@Module({
  imports: [
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
      models: [User, Trip],
      autoLoadModels: true,
      logging: false
    }),
    UsersModule,
    AuthModule,
    TripsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
