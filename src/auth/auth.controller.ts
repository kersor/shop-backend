import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IAuth } from './dto/create.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  async register (@Body() dto: IAuth) {
    return this.authService.register(dto)
  }

  @Post("/login")
  async login (@Body() dto: IAuth) {
    return this.authService.login(dto)
  }
}
