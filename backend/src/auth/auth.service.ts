import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserCreateDto } from "../users/dto/user-create.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import { User } from "../users/users.model";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
              private jwtService: JwtService) {}

  async login(loginDto: UserLoginDto) {
    const user = await this.usersService.getByEmail(loginDto.email);
    const passwordEquals = await bcrypt.compare(loginDto.password, user?.password ?? '');
    if (!user || !passwordEquals) throw new HttpException('Пользователь с такими данными не найден', HttpStatus.BAD_REQUEST);
    if (loginDto?.deviceToken != user?.deviceToken) {
      await user.update({deviceToken: loginDto.deviceToken ?? null})
      user.deviceToken = loginDto.deviceToken;
    }
    return this.generateToken(user);
  }
  async registration(createDto: UserCreateDto): Promise<{token: string}> {
    const error = await this.usersService.checkUnique(createDto);
    if (error) throw new HttpException(error, HttpStatus.BAD_REQUEST);

    const hash = await bcrypt.hash(createDto.password, 10);
    return this.generateToken(await this.usersService.create({ ...createDto, password: hash }));
  }

  private generateToken(user: User): {token: string} {
    const payload = {
      id: user.id,
      name: user.name,
      phone: user.phone,
      _t: user.deviceToken
    };
    return {token: this.jwtService.sign(payload)};
  }
}
