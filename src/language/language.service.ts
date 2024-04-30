import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Injectable()
export class LanguageService {
  create(createLanguageDto: CreateLanguageDto, files: any) {
    let fl: string = null;
    if (files?.icon) {
      fl = files?.icon[0].path;
    }

    // const Language.create({
    //   where: {
    //     name: 
    //     }
    // })


  }

  findAll() {
    return `This action returns all language`;
  }

  findOne(id: number) {
    return `This action returns a #${id} language`;
  }

  update(id: number, updateLanguageDto: UpdateLanguageDto) {
    return `This action updates a #${id} language`;
  }

  remove(id: number) {
    return `This action removes a #${id} language`;
  }
}
