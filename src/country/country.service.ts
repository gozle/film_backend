import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from 'src/models/country.model';
import { Translations } from 'src/models/translations.model';
import { where } from 'sequelize';

let pageLimit = 25;

@Injectable()
export class CountryService {
  async create(data: CreateCountryDto) {

    let country = await Country.findOne({ where: { name: data.name } });

    if (country) {
      throw new ConflictException();
    }

    await Country.create({
      name: data.name
    })

  }

  async findAll(page) {
    try {

      const pg = page || 1;
      let countries = await Country.findAll({
        limit: pageLimit,
        offset: (pg - 1) * pageLimit
      });
      return { countries }
    } catch (err) {
      throw err;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  async update(id: number, data: UpdateCountryDto) {

    let country = await Country.findByPk(id);

    if (!country) {
      throw new NotFoundException();
    }

    await country.update({
      name: data.name
    })
  }

  async remove(id: number) {
    let country = await Country.findByPk(id)
    let translations = await Translations.findAll({ where: { object_id: id, object_type: 'country' } })
    translations.map(async tr => await tr.destroy())
    country.destroy();
  }
}
