import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CompressService } from './compress.service';
import { CreateCompressDto } from './dto/create-compress.dto';
import { UpdateCompressDto } from './dto/update-compress.dto';

@Controller()
export class CompressController {
  constructor(private readonly compressService: CompressService) {}

  @MessagePattern('createCompress')
  create(@Payload() createCompressDto: CreateCompressDto) {
    return this.compressService.create(createCompressDto);
  }

  @MessagePattern('findAllCompress')
  findAll() {
    return this.compressService.findAll();
  }

  @MessagePattern('findOneCompress')
  findOne(@Payload() id: number) {
    return this.compressService.findOne(id);
  }

  @MessagePattern('updateCompress')
  update(@Payload() updateCompressDto: UpdateCompressDto) {
    return this.compressService.update(updateCompressDto.id, updateCompressDto);
  }

  @MessagePattern('removeCompress')
  remove(@Payload() id: number) {
    return this.compressService.remove(id);
  }
}
