import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, BadRequestException, UseGuards } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import { AuthGuard } from 'src/common/guards/auth.guard';


const multerOptions: {} = {
  storage: diskStorage({
    destination: 'uploads/avatars',
    filename: (req, file, cb) => {
      const filename = `${Date.now()}_${file.originalname}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimes = [];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Invalid file type'), false);
    }
  },
};


@ApiTags('video')
@UseGuards(AuthGuard)
@ApiHeader({ name: "access_token" })
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) { }
  @ApiOperation({
    summary: 'Video upload',
    description:
      'video upload',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {

        video_path: {
          type: "file"
        },
      },
    },
  })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }], multerOptions),
  )
  uploadVideo(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }




  @ApiOperation({
    summary: 'Video upload',
    description:
      'video upload',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {

        title: {
          type: "string"
        },

        description: {
          type: "string"
        },

        thumbnail: {
          type: "file"
        },

        video_path: {
          type: "file"
        },

        age_restriction: {
          type: "integer"
        },

        actors: {
          type: 'array'
        },

        genres: {
          type: 'array'
        },

        countries: {
          type: 'array'
        },

        premium: {
          type: 'boolean'
        },

        categoryId: {
          type: "integer"
        },

        episode: {
          type: "integer"
        },

        season: {
          type: "integer"
        },

        releaseDate: {
          type: "string",
          format: "date"

        }





      },
    },
  })
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }], multerOptions),
  )
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
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
