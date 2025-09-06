import { Body, Controller, Get, Patch, Req, UseGuards  } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { UserDto } from './dto/create.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get("/self")
  async getUserData (@Req() req: Request) {
    return this.userService.getUserData(req)
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateUser (@Body() dto: UserDto) {
    return this.userService.updateUser(dto)
  }
}
