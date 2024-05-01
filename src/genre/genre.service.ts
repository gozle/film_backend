import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from 'src/models/genre.model';

const pageLimit = 25;


@Injectable()
export class GenreService {
  async create(data: CreateGenreDto) {

    try {
      let genre = await Genre.findOne({ where: { name: data.name } });
      if (genre) {
        throw new ConflictException({ mes: 'Alreade exists' });
      }
      await Genre.create({ name: data.name });
    }
    catch (err) {
      throw err;
    }

  }

  async findAll(page) {
    try {

      const pg = page || 1;
      let genres = await Genre.findAll({
        limit: pageLimit,
        offset: (pg - 1) * pageLimit
      });
      return { genres }
    } catch (err) {
      throw err;
    }
  }

  async findOne(id: number) {

    try {

      let genre = await Genre.findByPk(id);
      return { genre }
    } catch (err) {
      throw err;
    }
  }

  async update(id: number, data: UpdateGenreDto) {

    try {

      let genre = await Genre.findByPk(id);

      if (!genre) {
        throw new BadRequestException();
      }

      await genre.update({
        name: data.name
      })


    } catch (err) {
      throw err;
    }

  }

  async remove(id: number) {
    let genre = await Genre.findByPk(id);

    if (!genre) {
      throw new BadRequestException();
    }

    await genre.destroy();

  }
}
