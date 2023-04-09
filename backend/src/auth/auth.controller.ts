import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "../users/dto/user-login.dto";
import { UserCreateDto } from "../users/dto/user-create.dto";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TokenDto } from "../swagger/token.dto";
import { LoginErrorDto } from "../swagger/login-error.dto";
import { SignupErrorDto } from "../swagger/signup-error.dto";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'Авторизация пользователя'})
  @ApiBody({type: UserLoginDto})
  @ApiResponse({ type: TokenDto, status: 200})
  @ApiResponse({ type: LoginErrorDto, status: 400})
  @Post('signin')
  login(@Body() loginDto: UserLoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({summary: 'Регистрация пользователь + возврат токена'})
  @ApiBody({type: UserCreateDto})
  @ApiResponse({ type: TokenDto, status: 200})
  @ApiResponse({ type: SignupErrorDto, status: 400})
  @Post('signup')
  registration(@Body() createDto: UserCreateDto): Promise<{token: string}> {
    return this.authService.registration(createDto);
  }
}
