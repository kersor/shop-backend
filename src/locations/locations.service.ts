import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateLocationDto } from './dto/create-locations.dto';
import { Location } from '@prisma/client';

@Injectable()
export class LocationsService {
    constructor (
        private prisma: PrismaService
    ) {}

    async addLocation (data: CreateLocationDto) {
        const isCandidate = await this.prisma.location.findUnique({where: {slug: data.slug}})

        if (isCandidate) {
            throw new HttpException('Город уже существует', HttpStatus.BAD_REQUEST)
        }

        await this.prisma.location.create({
            data
        })
    }

    async addMoreLocations (data: CreateLocationDto[]) {
        await this.prisma.location.createMany({
            data,
            skipDuplicates: true,
        })
    }

    async getAll (limit?: string, search?: string): Promise<Location[] | null> {
        return this.prisma.location.findMany({
            where: search
            ? {
                name: {
                    contains: search,
                    mode: 'insensitive',
                },
                }
            : undefined,
            take: limit ? +limit : undefined,
        });
    }

    async deleteLocation (id: string) {
        return this.prisma.location.delete({where: {id}})
    }

}
