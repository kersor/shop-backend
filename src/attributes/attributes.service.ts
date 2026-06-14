import { Injectable } from '@nestjs/common';
import { Attribute } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';

@Injectable()
export class AttributesService {
    constructor (
        private prisma: PrismaService
    ) {}

    async createAttribute (dto: CreateAttributeDto): Promise<Attribute> {
        return this.prisma.attribute.create({data: dto})
    }

    async getAllAttribute (search?: string, limit?: string): Promise<Attribute[]> {
        return this.prisma.attribute.findMany({
            where: search ? {
                name: {
                    contains: search,
                    mode: 'insensitive'
                }
            } : undefined,
            take: limit ? +limit : undefined
        })
    }

    async deleteAttribute (id: string) {
        return this.prisma.attribute.delete({where: {id}})
    }
}
