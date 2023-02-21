import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SinceService } from './since.service';
import { CreateSinceDto } from './dto/create-since.dto';
import { UpdateSinceDto } from './dto/update-since.dto';

@Controller('since')
export class SinceController {
  constructor(private readonly sinceService: SinceService) {}

  @Post()
  create(@Body() createSinceDto: CreateSinceDto) {
    return this.sinceService.create(createSinceDto);
  }

  @Get()
  findAll() {
    return this.sinceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sinceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSinceDto: UpdateSinceDto) {
    return this.sinceService.update(+id, updateSinceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sinceService.remove(+id);
  }
}
