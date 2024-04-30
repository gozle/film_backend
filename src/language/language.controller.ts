import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterAvatarOptions } from 'src/util/avatar.multer.options';
import * as multer from 'multer'

@ApiTags('language')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) { }

  @ApiConsumes('applications/json')
  @ApiBody({
    schema: {
      type: 'onject',
      properties: {
        name: {
          type: "string"
        },
        icon: {
          type: 'file'
        }
      }
    }
  })
  @Post('add')

  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'icon', maxCount: 1 }], MulterAvatarOptions),
  )
  create(@Body() createLanguageDto: CreateLanguageDto, @UploadedFiles() files: { icon?: multer.File[] }) {
    return this.languageService.create(createLanguageDto, files);
  }

  @Get()
  findAll() {
    return this.languageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.languageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLanguageDto: UpdateLanguageDto) {
    return this.languageService.update(+id, updateLanguageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.languageService.remove(+id);
  }
}
