import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { UserCreateDto } from "./dto/user-create.dto";
import { Op } from "sequelize";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(createDto: UserCreateDto) {
    return await this.userModel.create(createDto);
  }

  getMe() {
    return { test: 123 };
  }
  async getById(id: number): Promise<User> {
    return await this.userModel.findOne({
      where: {id},
      attributes: { exclude: ['password']}
    });
  }
  async getByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({
      where: {email}
    });
  }

  async checkUnique(createDto: UserCreateDto): Promise<Object> {
    const {email, phone} = createDto;
    const user = await this.userModel.findOne({
      where: { [Op.or]: [{email, phone}] }
    });
    if (!user) return null;
    const errors = [];
    if (user.phone === phone) errors.push('phone');
    if (user.email === email) errors.push('email');
    return {
      message: 'Пользователь с такими данными уже существует',
      errors
    };
  }
}
