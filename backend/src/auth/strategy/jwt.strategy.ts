import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {PayloadDto} from "./dto/payload.dto";
import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UsersService} from "../../users/users.service";
import {User} from "../../users/users.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.APP_SECRET || 'SECRET'
        });
    }

    async validate(payload: PayloadDto): Promise<User> {
        const user = await this.usersService.getById(payload.id);
        if (!user || user.deviceToken !== (payload._t ?? null))
            throw new UnauthorizedException({
                statusCode: 401,
                message: 'Пользователь не авторизирован'
            });
        return user;
    }
}