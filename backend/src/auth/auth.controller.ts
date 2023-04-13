import {Body, Controller, Post, UseGuards} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {UserLoginDto} from "./dto/user-login.dto";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TokenDto} from "../swagger/token.dto";
import {LoginErrorDto} from "../swagger/login-error.dto";
import {SignupErrorDto} from "../swagger/signup-error.dto";
import {UserCreateDto} from "./dto/user-create.dto";
import {UserData} from "../users/decorator/user-data.decorator";
import {User} from "../users/users.model";
import {JwtGuard} from "./guard";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Авторизация пользователя'})
    @ApiBody({type: UserLoginDto})
    @ApiResponse({type: TokenDto, status: 200})
    @ApiResponse({type: LoginErrorDto, status: 400})
    @Post('signin')
    async login(@Body() loginDto: UserLoginDto) {
        return await this.authService.login(loginDto);
    }

    @ApiOperation({summary: 'Регистрация пользователя + возврат токена'})
    @ApiBody({type: UserCreateDto})
    @ApiResponse({type: TokenDto, status: 200})
    @ApiResponse({type: SignupErrorDto, status: 400})
    @Post('signup')
    async registration(@Body() createDto: UserCreateDto): Promise<{ token: string }> {
        return await this.authService.registration(createDto);
    }

    @UseGuards(JwtGuard)
    @ApiOperation({summary: 'Выйти из текущего аккаунта'})
    @Post('logout')
    async logout(@UserData() user: User): Promise<void> {
        return await this.authService.logout(user);
    }
}
