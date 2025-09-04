import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create.dto';

@Injectable()
export class UserService {
    constructor(
        readonly prisma: PrismaService
    ) {}

    createUser (dto: CreateUserDto) {
        const user = this.prisma.user.create({
            data: {
                email: dto.email,
                password: dto.password
            }
        })

        return user
    }
}
