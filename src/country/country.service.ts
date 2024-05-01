import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from 'src/models/country.model';
import { Translations } from 'src/models/translations.model';

let pageLimit = 25;

@Injectable()
export class CountryService {
  create(data: CreateCountryDto) {



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

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  async remove(id: number) {
    let country = await Country.findByPk(id)
    let translations = await Translations.findAll({ where: { object_id: id, object_type: 'country' } })
    country.destroy();
  }
}
