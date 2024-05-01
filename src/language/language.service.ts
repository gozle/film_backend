import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { Language } from 'src/models/language.model';
import { where } from 'sequelize';
import { deleteFile } from 'src/util/deleteFile';

let pageLimit = 25;

@Injectable()
export class LanguageService {
  async create(data: CreateLanguageDto, files: any) {

    try {

      let language = await Language.findOne({ where: { short_name: data.short_name } });

      let fl: string = null;
      if (files?.icon) {
        fl = files?.icon[0].path;
      }

      if (language) {
        if (fl) {
          deleteFile(fl);
        }
        throw new ConflictException();
      }

      await Language.create({
        where: {
          name: data.name,
          icon: fl,
          short_name: data.short_name
        }
      })

      return;

    }
    catch (err) {
      throw err;
    }
  }

  async findAll(page) {
    try {

      const pg = page || 1;
      let languages = await Language.findAll({
        limit: pageLimit,
        offset: (pg - 1) * pageLimit
      });
      return { languages }
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number) {
    try {

      let language = await Language.findByPk(id);
      return { language }
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, data: UpdateLanguageDto, files: any) {
    try {
      let language = await Language.findByPk(id);

      if (!language) {
        throw new BadRequestException();
      }

      let fl: string = language.icon;
      if (files?.icon) {
        await deleteFile(fl);
        fl = files?.icon[0].path;
      }

      await language.update({
        name: data.name,
        icon: fl,
        short_name: data.short_name

      })



    }
    catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    try {
      let language = await Language.findByPk(id);

      if (!language) {
        throw new BadRequestException();
      }

      await deleteFile(language.icon);
      await language.destroy();

    }
    catch (err) {
      throw err;
    }
  }
}
