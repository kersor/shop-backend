import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UserDto } from './dto/create.dto';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        readonly prisma: PrismaService,
        @Inject(forwardRef(() => AuthService))
        readonly authService: AuthService
    ) {}

    async getUserData (req: Request) {
        const authorization = req.headers.authorization

        if (!authorization?.length) throw new HttpException("Нет доступа", HttpStatus.UNAUTHORIZED)
        
        const token = authorization.split(' ')[1]
        const userInToken = await this.authService.parseToken(token)

        const user = await this.foundUserForEmail(userInToken.email)
        
        return user
    }

    async createUser (dto: CreateUserDto) {
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: dto.password
            }
        })

        return user
    }

    async updateUser (dto: UserDto) {
        const user = await this.prisma.user.update({
            where: {
                id: dto.id
            },
            data: {
                ...dto
            }
        })

        return user
    }

    async foundUserForEmail (email: string) {
        const user = await this.prisma.user.findUnique({where: {email}})
        return user
    }
}
