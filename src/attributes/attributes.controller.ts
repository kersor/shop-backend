import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { Attribute } from '@prisma/client';
import { CreateAttributeDto } from './dto/create-attribute.dto';

@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Post()
  async createAttribute (@Body() dto: CreateAttributeDto): Promise<Attribute> {
    return this.attributesService.createAttribute(dto)
  }

  @Get()
  async getAllAttribute (
    @Query('search') search?: string,
    @Query('limit') limit?: string
  ): Promise<Attribute[]> {
    return this.attributesService.getAllAttribute(search, limit)
  }

  @Delete(':id')
  async deleteAttribute (@Param('id') id: string) {
    return this.attributesService.deleteAttribute(id)
  }
}
