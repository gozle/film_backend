import { ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { Op } from 'sequelize';
import { User } from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
const sendEmail = require('../util/sendMail');



dotenv.config();

const access_secret = process.env.ADMIN_ACCESS_SECRET;
const refrsh_secret = process.env.ADMIN_REFRESH_SECRET;
const verify_secret = process.env.EMAIL_VER_SECRET;

const accesOption = {
  secret: access_secret,
  expiresIn: '1h',
};

const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 300, checkperiod: 320 });

const refreshOption = {
  secret: refrsh_secret,
  expiresIn: '15d',
};

const verifyOption = {
  secret: verify_secret,
};

const url = process.env.URL;



@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
  ) { }

  // async create(data: CreateUserDto, file: string) {


  //   try {
  //     const hashed = await bcrypt.hash(data.password, 12);

  //     let us = await User.findOne({
  //       where: {
  //         email: data.email
  //       },
  //     });

  //     let hasError = { err: false, msg: '' };

  //     if (us) {
  //       hasError.err = true;
  //       hasError.msg = 'This username already exists. Please try another one!';
  //     }

  //     if (us && us.email == data.email) {
  //       if (!us.isVerify) {
  //         const payload1 = { id: us.id, email: us.email };
  //         const emailToken = await this.jwtService.signAsync(
  //           payload1,
  //           verifyOption,
  //         );
  //         const hasSent = myCache.get(`${us.email}`);

  //         if (!hasSent) {
  //           let mailText = `<h1> Salam! 🖐🏻</h1>
  //           </br>
  //           </br>
  //           <h3>Gözle wideo E-mail adresiňizi tassyklamak üçin aşakdaky baglanyşygy ulanmagyňyzy haýyş edýäris!</h3>
  //           </br>
  //           <h3>Eger bu saýtda registrasiýa etmedik bolsaňyz, bu habary äsgermezlik ediň ýa-da pozuň.!</h3>
  //           </br>
  //           </br>
  //           <a href="${url}/api/auth/verify/email/${emailToken}">${url}/api/auth/verify/email/${emailToken}</a>
  //           Registrasiýaňyz üçin sag boluň!
  //           </br>
  //           Gözle topary!
  //           `;
  //           myCache.set(`${us.email}`, true, 300);
  //           let send = await sendEmail.sendEmailMessage(data.email, mailText);
  //         }
  //         hasError.err = true;
  //         hasError.msg =
  //           'This e-mail address already exists or not verified. Please try another one or verify it!';
  //       } else {
  //         hasError.err = true;
  //         hasError.msg =
  //           'This e-mail address already exists. Please try another one or Log in';
  //       }
  //     }
  //     if (hasError.err) {
  //       throw new ConflictException(hasError.msg);
  //     }

  //     const user = await User.create({
  //       email: data.email,
  //       password: hashed,
  //       avatar: file,
  //       birth_date: data.birth,
  //       gender: data.gender,
  //       isVerify: false,
  //     });
  //     const payload1 = { id: user.id, email: data.email };
  //     const emailToken = await this.jwtService.signAsync(
  //       payload1,
  //       verifyOption,
  //     );
  //     const hasSent = myCache.get(`${user.email}`);

  //     if (!hasSent) {
  //       myCache.set(`${user.email}`, true);
  //       let mailText = `<h1> Salam! 🖐🏻</h1>
  //     </br>
  //     </br>
  //     <h3>Gözle wideo E-mail adresiňizi tassyklamak üçin aşakdaky baglanyşygy ulanmagyňyzy haýyş edýäris!</h3>
  //     </br>
  //     <h3>Eger bu saýtda registrasiýa etmedik bolsaňyz, bu habary äsgermezlik ediň ýa-da pozuň.!</h3>
  //     </br>
  //     </br>
  //     <a href="${url}/api/auth/verify/email/${emailToken}">${url}/api/auth/verify/email/${emailToken}</a>
  //     Registrasiýaňyz üçin sag boluň!
  //     </br>
  //     Gözle topary!
  //     `;
  //       await sendEmail.sendEmailMessage(data.email, mailText);
  //     }
  //     // const payload = { id: user.id, username: user.username };
  //     // const acces_token = await this.jwtService.signAsync(payload, accesOption);
  //     // const refresh_token = await this.jwtService.signAsync(
  //     //   payload,
  //     //   refreshOption,
  //     // );

  //     return { message: 'Succesfully sent link to E-mail address!' };
  //   } catch (err) {
  //     throw err;
  //   }

  // }



  async findAll(sort: string) {

    let s_by = 'createdAt';
    let s = 'ASC'
    if (sort) {
      s_by = sort.split("-")[0];
      s = sort.split("-")[1];
    }

    const users = await User.findAll({ order: [[`${s_by}`, `${s}`]] });
    return { users };
  }

  async findOne(id: string) {
    const user = await User.findByPk(id);
    return { user };
  }

  // async login(data: any) {
  //   const user = await User.findOne({
  //     where: { email: data.email }, //, isVerify: true
  //   });
  //   if (!user.isVerify) {
  //     const payload1 = { id: user.id, email: user.email };
  //     const emailToken = await this.jwtService.signAsync(
  //       payload1,
  //       verifyOption,
  //     );
  //     const hasSent = myCache.get(`${user.email}`);

  //     if (!hasSent) {
  //       myCache.set(`${user.email}`, true);
  //       let mailText = `<h1> Salam! 🖐🏻</h1>
  //     </br>
  //     </br>
  //     <h3>Gözle wideo E-mail adresiňizi tassyklamak üçin aşakdaky baglanyşygy ulanmagyňyzy haýyş edýäris!</h3>
  //     </br>
  //     <h3>Eger bu saýtda registrasiýa etmedik bolsaňyz, bu habary äsgermezlik ediň ýa-da pozuň.!</h3>
  //     </br>
  //     </br>
  //     <a href="${url}/api/auth/verify/email/${emailToken}">${url}/api/auth/verify/email/${emailToken}</a>
  //     Registrasiýaňyz üçin sag boluň!
  //     </br>
  //     Gözle topary!
  //     `;
  //       let send = await sendEmail.sendEmailMessage(data.email, mailText);
  //     }
  //     throw new ForbiddenException({
  //       message: 'Please sign up or check your e-post if already signed up!',
  //     });
  //   }

  //   const match = await bcrypt.compare(data.password, user.password);

  //   if (!match) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = { id: user.id };
  //   const access_token = await this.jwtService.signAsync(payload, accesOption);
  //   const refresh_token = await this.jwtService.signAsync(
  //     payload,
  //     refreshOption,
  //   );
  //   return { access_token, refresh_token };
  // }


  // async remove(id: string) {
  //   const user = await User.findByPk(id);
  //   user.destroy();
  //   return { mes: "Success" };
  // }
}
