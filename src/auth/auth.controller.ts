import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: "string" },
        password: { type: "string" }
      },
      required: ['username', 'password']
    }
  })
  @Post('login')
  login(@Body() data: AuthDto) {
    return this.authService.login(data);
  }

}
