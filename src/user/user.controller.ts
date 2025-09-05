import { Controller, Get, Req, UseGuards  } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get("/self")
  async getUserData (@Req() req: Request) {
    return this.userService.getUserData(req)
  }
}
