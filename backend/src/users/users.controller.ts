import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { JwtGuard } from "../auth/guard";
import { Request } from "express";
import { User } from "./users.model";
import { MeErrorDto } from "../swagger/me-error.dto";

@UseGuards(JwtGuard)
@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Вернуть авторизированного пользователя'})
  @ApiResponse({ type: User, status: 200})
  @ApiResponse({ type: MeErrorDto, status: 400})
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
