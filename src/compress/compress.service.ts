import { Injectable } from '@nestjs/common';
import { CreateCompressDto } from './dto/create-compress.dto';
import { UpdateCompressDto } from './dto/update-compress.dto';

@Injectable()
export class CompressService {
  create(createCompressDto: CreateCompressDto) {
    return 'This action adds a new compress';
  }

  findAll() {
    return `This action returns all compress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compress`;
  }

  update(id: number, updateCompressDto: UpdateCompressDto) {
    return `This action updates a #${id} compress`;
  }

  remove(id: number) {
    return `This action removes a #${id} compress`;
  }
}
