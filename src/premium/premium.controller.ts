import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Response } from '@nestjs/common';
import { PremiumService } from './premium.service';
import { CreatePremiumDto } from './dto/create-premium.dto';
import { UpdatePremiumDto } from './dto/update-premium.dto';
import { ApiBody, ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/common/guards/auth.guard';


@ApiTags('Premium')
// @UseGuards(AuthGuard)
@ApiHeader({ name: "access_token" })
@Controller('premium')
export class PremiumController {
  constructor(private readonly premiumService: PremiumService) { }

  @Post('add')
  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        duration: { type: "string" },
        price: { type: "integer" },
        device_count: { type: "integer" }
      }
    }
  })
  create(@Body() data: CreatePremiumDto) {
    return this.premiumService.create(data);
  }

  @Get()
  findAll() {
    return this.premiumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.premiumService.findOne(+id);
  }

  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: { type: "string" },
        description: { type: "string" },
        duration: { type: "string" },
        price: { type: "string" },
        device_count: { type: "number" }
      }
    }
  })
  @Patch('update/:id')
  update(@Param('id') id: number, @Body() updatePremiumDto: UpdatePremiumDto) {
    return this.premiumService.update(+id, updatePremiumDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    return await this.premiumService.remove(+id);

  }
}
