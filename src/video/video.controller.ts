import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, BadRequestException, UseGuards, UploadedFiles } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import { AuthGuard } from 'src/common/guards/auth.guard';
import * as CONSTANTS from './video.constants'
import { CreateMetaDataDto } from './dto/create-metadata.dto';



const multerOptions: {} = {
  storage: diskStorage({
    destination: 'uploads/videos',
    filename: (req, file, cb) => {
      const filename = `${Date.now()}_${file.originalname}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = CONSTANTS.MIME_TIPES;
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Invalid file type'), false);
    }
  },
};


@ApiTags('video')
// @UseGuards(AuthGuard)
@ApiHeader({ name: "access_token" })
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) { }


  @Post('movie')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }], multerOptions),
  )
  createMetadata(@Body() createMetadataDto: CreateMetaDataDto,
    @UploadedFiles() files: { thumbnail?: multer.File[], video?: multer.File[] },

  ) {
    return this.videoService.createMetadata(createMetadataDto, files);
  }

  @ApiOperation({
    summary: 'Video upload',
    description:
      'After successfully upload it gives video Id for adding metadata',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiConsumes('multipart/form-data')


  @Post('upload/:movieId')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }], multerOptions),
  )
  create(@Body() createVideoDto: CreateVideoDto,
    @Param('movieId') id: string,
    @UploadedFiles() files: { thumbnail?: multer.File[], video?: multer.File[] },) {
    return this.videoService.create(+id, createVideoDto, files);
  }


  @Get()
  findAll() {

    return this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }
}
