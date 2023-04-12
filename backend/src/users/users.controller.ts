import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { JwtGuard } from "../auth/guard";
import { User } from "./users.model";
import { MeErrorDto } from "../swagger/me-error.dto";
import {UserData} from "./decorator/user-data.decorator";

@UseGuards(JwtGuard)
@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Вернуть авторизированного пользователя'})
  @ApiResponse({ type: User, status: 200})
  @ApiResponse({ type: MeErrorDto, status: 400})
  @Get('me')
  getMe(@UserData() user: User) {
    return user;
  }
}
