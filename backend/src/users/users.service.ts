import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Op} from "sequelize";
import {UserCreateDto} from "../auth/dto/user-create.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userModel: typeof User) {
    }

    async create(createDto: UserCreateDto) {
        return await this.userModel.create(createDto);
    }

    async getById(id: number): Promise<User> {
        return await this.userModel.findOne({
            where: {id},
            include: [{all: true, attributes: {exclude: ['password']}}],
            attributes: {exclude: ['password']}
        });
    }

    async getByEmail(email: string): Promise<User> {
        return await this.userModel.findOne({
            where: {email}
        });
    }

    async getByPhone(phone: string): Promise<User> {
        return await this.userModel.findOne({
            where: {phone}
        });
    }

    async checkUnique(createDto: UserCreateDto): Promise<Object> {
        const user = await this.userModel.findOne({
            where: {[Op.or]: [{phone: createDto.phone}]}
        });
        if (!user) return null;
        const errors = [];
        if (user.phone === createDto.phone) errors.push('phone');
        return {
            message: 'Пользователь с такими данными уже существует',
            errors
        };
    }
}
