import { Controller, Get } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PingDto } from "./swagger/ping.dto";

@Controller()
export class AppController {
  @ApiOperation({summary: 'Тест запрос'})
  @ApiResponse({ type: PingDto, status: 200})
  @Get('ping')
  ping() {
    return { message: 'pong' };
  }
}
