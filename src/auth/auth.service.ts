import { forwardRef, HttpException, HttpStatus,  Inject,  Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IAuth, IToken } from './dto/create.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/user/dto/create.dto';

const SALT = Number(process.env.SALT) || 11

@Injectable()
export class AuthService {
    constructor(
        readonly prisma: PrismaService,
        @Inject(forwardRef(() => UserService))
        readonly userService: UserService,
        readonly jwtService: JwtService
    ) {}

  async register (dto: IAuth) {
    const checkEmail = await this.userService.foundUserForEmail(dto.email)

    if (checkEmail) {
      throw new HttpException("Поль-ль уже существует", HttpStatus.BAD_REQUEST)
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const passwordHash = await bcrypt.hash(dto.password, SALT);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, ...user} = await this.userService.createUser({password: passwordHash, email: dto.email})
    const token = await this.createToken(user)

    return {
      user: user,
      access_token: token
    }
  }

  async login (dto: IAuth) {
    const candidate = await this.userService.foundUserForEmail(dto.email)

    if (!candidate) {
      throw new HttpException("Пароль или почта не верны", HttpStatus.BAD_REQUEST)
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const candidatePassword = await bcrypt.compare(dto.password, candidate.password)

    if (!candidatePassword) {
      throw new HttpException("Пароль или почта не верны", HttpStatus.BAD_REQUEST)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {password, ...user} = candidate
    const token = await this.createToken(user)

    return {
      user: user,
      access_token: token
    }

  }


  async createToken (dto: IToken) {
    const access_token = await this.jwtService.signAsync(dto)
    return access_token
  }

  async parseToken (token: string) {
    const user = await this.jwtService.verifyAsync<UserDto>(token)
    return user
  }
}
