import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-locations.dto';
import { Location } from '@prisma/client';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async addLocation (@Body() dto: CreateLocationDto) {
    return this.locationsService.addLocation(dto)
  }

  @Post('/more')
  async addMoreLocations (@Body() dto: CreateLocationDto[]) {
    return this.locationsService.addMoreLocations(dto)
  }

  @Get()
  async getAll (
    @Query('limit') limit?: string,
    @Query('search') search?: string
  ): Promise<Location[] | null> {
    return this.locationsService.getAll(limit, search)
  }

  @Delete(':id')
  async deleteLocation (@Param('id') id: string) {
    return this.locationsService.deleteLocation(id)
  }
} 
