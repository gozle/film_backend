import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { GiftService } from './gift.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { ApiBody, ApiConsumes, ApiHeader, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags("giftCard")
// @UseGuards(AuthGuard)
@ApiHeader({ name: "access_token" })
@Controller('gift')
export class GiftController {
  constructor(private readonly giftService: GiftService) { }

  @Post("add")
  @ApiOperation({ summary: "create gift card", description: 'Create many gift card in one time, "createCount" is number to be created, "premiumId" is a id of Premium need to get  ' })
  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        premiumId: {
          type: "number"
        },
        createCount: {
          type: "number"
        }
      }
    }
  })
  create(@Body() createGiftDto: CreateGiftDto) {
    return this.giftService.create(createGiftDto);
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
  @ApiQuery({ name: "is_active", required: false, type: 'boolean' })
  @Get()
  findAll(@Query('sort') sort: any,
    @Query('is_active') is_active: boolean,
  ) {
    return this.giftService.findAll(sort, is_active);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giftService.findOne(+id);
  }



  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.giftService.remove(+id);
  // }
}
