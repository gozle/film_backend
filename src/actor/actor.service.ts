import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { Actor } from 'src/models/actor.model';
import { deleteStorageFile } from 'src/util/deleteFile';

const pageLimit = 25;

@Injectable()
export class ActorService {
  async create(data: CreateActorDto, files) {

    let fl = null;
    if (files?.avatar) {
      fl = files?.avatar[0].path;
    }

    try {
      await Actor.create({
        name: data.name,
        avatar: fl
      });

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

      console.log(actor)

      let fl = actor.avatar;
      if (files.avatar) {
        if (fl) {
          deleteStorageFile(fl);
        }

        fl = files.avatar[0].path;
      }
      console.log(fl)

      actor.update({
        name: data.name,
        avatar: fl
      });

      return;
    } catch (err) {
      throw err;
    }
  }

  async remove(id: number) {
    try {
      const actor = await Actor.findByPk(id);
      await deleteStorageFile(actor.avatar);
      actor.destroy();
      return;
    } catch (err) {
      throw err
    }
  }
}
