import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from '../models/video.model'
import { Metadata } from 'src/models/metadata.mode';

import { getVideoDuration } from 'src/util/get-video-duration';
import { CreateMetaDataDto } from './dto/create-metadata.dto';
import { ActorVideo } from 'src/models/actorVideo.model';
import { GenreVideo } from 'src/models/genreVideo.model';
import { CountryVideo } from 'src/models/countryVideo.model';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';




@Injectable()
export class VideoService {

  constructor(

    private readonly rabbitmqService: RabbitMQService
  ) { }



  async create(id: number, data: CreateVideoDto, files) {

    try {


      console.log(files);

      let vd_path = files.video[0].path;
      let thumbnail_path = files.thumbnail[0].path;

      let duration = await getVideoDuration(vd_path);

      let season = data.season || null;
      let episode = data.episode || null;

      console.log(id)

      const metaData = await Metadata.findByPk(id);


      const video = await Video.create({
        video_path: vd_path,
        thumbnail: thumbnail_path,
        releaseDate: data.releaseDate,
        season: season,
        episode: episode,
        duration: duration,
        metaDataId: metaData.id,
        status: 'upload',
      });

      const payload = {
        path: thumbnail_path,
        type: "photo",
      }

      await this.rabbitmqService.publishMessage(payload);

      const payload1 = {
        path: vd_path,
        type: "video",
      }

      await this.rabbitmqService.publishMessage(payload1);


      return { videoId: video.id };
    } catch (err) {

      throw err;
    }

  }



  async createMetadata(data: CreateMetaDataDto, file) {


    let fl = file.photo[0].path;


    const metaData = await Metadata.create({
      title: data.title,
      description: data.description,
      photo: fl,
      age_restriction: data.age_restriction,
      premium: data.premium,
      categoryId: data.categoryId
    });


    let actors = [];
    for (let i of data.actorId) {
      actors.push({ metaDataId: metaData.id, actorId: i })
    }

    await ActorVideo.bulkCreate(actors);

    let genres = [];
    for (let i of data.genreId) {
      genres.push({ metaDataId: metaData.id, genreId: i })
    }
    await GenreVideo.bulkCreate(genres);

    let countries = [];
    for (let i of data.countryId) {
      countries.push({ metaDataId: metaData.id, countryId: i })
    }
    await CountryVideo.bulkCreate(countries);

    return metaData.id;

  }

  findAll() {
    return `This action returns all video`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
