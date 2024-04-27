import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBody, ApiConsumes, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('category')
@UseGuards(AuthGuard)
@ApiHeader({ name: "access_token" })
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        parentId: { type: "number" }
      }
    }
  })
  @Post('add')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }


  @ApiQuery({
    name: "sort", required: false, examples: {
      example1: {
        value: "createdAt-ASC"
      },
      example2: {
        value: "createdAt-DESC"
      },
    }
  })
  @Get()
  findAll(
    @Query('sort') sort: string
  ) {
    return this.categoryService.findAll(sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        parentId: { type: "number" }
      }
    }
  })
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
