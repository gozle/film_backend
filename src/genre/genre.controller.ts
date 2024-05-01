import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) { }

  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: "string"
        }
      }
    }
  })
  @Post('add')
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @ApiQuery({ name: 'page', required: false })
  @Get()
  findAll(
    @Query('page') page: string
  ) {
    return this.genreService.findAll(page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }


  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(+id, updateGenreDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
