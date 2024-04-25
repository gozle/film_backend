import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Admin } from 'src/models/admin.model';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

const access_secret = process.env.ADMIN_ACCESS_SECRET;
const refrsh_secret = process.env.ADMIN_REFRESH_SECRET;

const accesOption = {
  secret: access_secret,
  expiresIn: '1h',
};

const refreshOption = {
  secret: refrsh_secret,
  expiresIn: '15d',
};


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) { }
  async login(body: AuthDto) {


    const admin = await Admin.findOne({ where: { username: body.username } })

    if (!admin) {
      throw new ForbiddenException()
    }

    const match = await bcrypt.compare(body.password, admin.password);

    if (!match) {
      throw new ForbiddenException()
    }

    const payload1 = { id: admin.id, username: admin.username, degree: admin.degree };

    const acces_token = await this.jwtService.signAsync(
      payload1,
      accesOption,
    );

    const refresh_token = await this.jwtService.signAsync(
      payload1,
      refreshOption
    )


    return { acces_token, refresh_token };
  }


}
