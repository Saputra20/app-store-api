import { Injectable } from '@nestjs/common';
import { CreateSinceDto } from './dto/create-since.dto';
import { UpdateSinceDto } from './dto/update-since.dto';

@Injectable()
export class SinceService {
  create(createSinceDto: CreateSinceDto) {
    return 'This action adds a new since';
  }

  findAll() {
    return `This action returns all since`;
  }

  findOne(id: number) {
    return `This action returns a #${id} since`;
  }

  update(id: number, updateSinceDto: UpdateSinceDto) {
    return `This action updates a #${id} since`;
  }

  remove(id: number) {
    return `This action removes a #${id} since`;
  }
}
