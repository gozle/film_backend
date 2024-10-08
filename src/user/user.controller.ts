import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import multer, { diskStorage } from 'multer';
import * as CONSTANTS from "./user.constants"


const multerOptions: {} = {
  storage: diskStorage({
    destination: 'uploads/avatars',
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


@ApiTags('register')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @ApiOperation({
    summary: 'Registration',
    description:
      'Registrasiya edenden son email`a verification link ugradylyar',
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
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        avatar: {
          type: 'file',
        },
        birth: {
          type: 'string',
          format: "date",
          example: '2004-01-01'
        },
        gender: {
          type: 'string',
          enum: [
            "male",
            "female",
            "not specified"
          ]
        }


      },
      required: ['email', 'password'],
    },
  })
  @Post('register')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }], multerOptions),
  )

  create(
    @Body() body: CreateUserDto,
    @UploadedFiles() file: { avatar?: multer.File[] },
  ) {
    let fl;
    if (file.avatar) {
      fl = file?.avatar[0].path || null;
    }

    console.log(body)
    return this.userService.create(body, fl);
  }








  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
