import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {RegCarDto} from "./dto/reg-car.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Car} from "./cars.model";
import {User} from "../users/users.model";

@Injectable()
export class CarsService {
    constructor(@InjectModel(Car) private carsModel: typeof Car) {}

    async regCar(regCarDto: RegCarDto, user: User): Promise<Car> {
        if (await this.getCarByNumber(regCarDto.stateNumber))
            throw new HttpException('Машина с таким номером уже зарегистрирована', HttpStatus.BAD_REQUEST);
        const car = await this.carsModel.create({...regCarDto, ownerId: user.id});
        await user.update({carId: car.id});
        return car;
    }
    async getMeCar(user: User): Promise<Car> {
        if (!user.carId)
            throw new HttpException('Пользователь не имеет машины', HttpStatus.BAD_REQUEST);
        return await this.carsModel.findOne({
            where: {id: user.carId},
            include: [{all: true, attributes: {exclude: ['password']}}]
        });
    }
    async delMeCar(user: User): Promise<void> {
        if (!user.carId)
            throw new HttpException('Пользователь не имеет машины', HttpStatus.BAD_REQUEST);
        await this.carsModel.destroy({where: {id: user.carId}});
        await user.update({carId: null});
        return;
    }

    async getCarByNumber(stateNumber: string): Promise<Car> {
        return await this.carsModel.findOne({where: {stateNumber}});
    }
}
