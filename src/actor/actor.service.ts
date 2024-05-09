import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from 'src/models/actor.model';
import { deleteStorageFile } from 'src/util/deleteFile';
import { Language } from 'src/models/language.model';
import { Translations } from 'src/models/translations.model';

const pageLimit = 25;

@Injectable()
export class ActorService {
  async create(data: CreateActorDto, files) {

    let fl = null;
    if (files?.avatar) {
      fl = files?.avatar[0].path;
    }

    try {
      const actor = await Actor.create({
        name: data.name,
        avatar: fl
      });

      const languages = await Language.findAll();

      let bulkObkjects = [];

      languages.map(lang => {
        bulkObkjects.push({
          name: data[`name_${lang.id}`],
          object_type: "actor",
          object_id: actor.id,
          languageId: lang.id
        })

      })
      await Translations.bulkCreate(bulkObkjects);

      return;
    } catch (err) {
      throw err;
    }

  }

  async findAll(page: number) {
    const pg = page || 1;
    try {
      const actors = await Actor.findAll({
        limit: pageLimit,
        offset: pageLimit * (pg - 1)
      });
      return actors;
    } catch (err) {
      throw err;
    }
  }


  async findOne(id: number) {
    try {


      const actor = await Actor.findByPk(id);
      return actor;
    } catch (err) {
      throw (err);
    }

  }

  async update(id: number, data: UpdateActorDto, files) {
    try {
      const actor = await Actor.findByPk(id);

      if (!actor) {
        throw new NotFoundException({ mes: "Actor not found" });
      }

      let fl = actor.avatar;
      if (files.avatar) {
        if (fl) {
          deleteStorageFile(fl);
        }
        fl = files.avatar[0].path;
      }


      actor.update({
        name: data.name,
        avatar: fl
      });


      const languages = await Language.findAll();



      languages.map(async lang => {

        const langObject = await Translations.findOne({ where: { object_type: "actor", object_id: actor.id, languageId: lang.id } })

        if (!langObject) {
          await Translations.create({
            name: data[`name_${lang.id}`],
            object_type: "actor",
            object_id: actor.id,
            languageId: lang.id
          });
        } else {
          await langObject.update({
            name: data[`name_${lang.id}`],
            object_type: "actor",
            object_id: actor.id,
            languageId: lang.id
          })
        }

      })




      return;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    try {
      const actor = await Actor.findByPk(id);
      await deleteStorageFile(actor.avatar);
      await Translations.destroy({ where: { object_type: "actor", object_id: actor.id } });
      await actor.destroy();
      return;
    } catch (err) {
      throw err
    }
  }
}
