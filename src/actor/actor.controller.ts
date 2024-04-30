import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterAvatarOptions } from 'src/util/avatar.multer.options';
import * as multer from 'multer'
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('actor')
@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) { }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: "string"
        },
        avatar: {
          type: 'file',

        },

      }
    }
  })
  @Post('add')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }], MulterAvatarOptions),
  )
  create(@Body() createActorDto: CreateActorDto, @UploadedFiles() files: { avatar?: multer.File[] },) {

    return this.actorService.create(createActorDto, files);
  }

  @ApiQuery({ name: 'page', required: false })
  @Get()
  findAll(
    @Query('page') page: string
  ) {
    return this.actorService.findAll(+page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorService.findOne(+id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: "string"
        },
        avatar: {
          type: 'file',

        },

      }
    }
  })
  @Patch('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }], MulterAvatarOptions),
  )
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto, @UploadedFiles() files: { avatar?: multer.File[] }) {
    return this.actorService.update(+id, updateActorDto, files);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.actorService.remove(+id);
  }
}
