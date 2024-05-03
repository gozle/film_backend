import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from '../models/video.model'
import { Metadata } from 'src/models/metadata.mode';
import { ClientProxy } from '@nestjs/microservices';
import { getVideoDuration } from 'src/util/get-video-duration';
import { CreateMetaDataDto } from './dto/create-metadata.dto';
import { ActorVideo } from 'src/models/actorVideo.model';
import { GenreVideo } from 'src/models/genreVideo.model';
import { CountryVideo } from 'src/models/countryVideo.model';


@Injectable()
export class VideoService {

  constructor(
    @Inject('VIDEO_SERVICE') private rabbitClient: ClientProxy
  ) { }


  // [Object: null prototype] {
  //   video: [
  //     {
  //       fieldname: 'video',
  //       originalname: 'v2.mov',
  //       encoding: '7bit',
  //       mimetype: 'video/quicktime',
  //       destination: 'uploads/videos',
  //       filename: '1714744609688_v2.mov',
  //       path: 'uploads/videos/1714744609688_v2.mov',
  //       size: 2414412
  //     }
  //   ],
  //   thumbnail: [
  //     {
  //       fieldname: 'thumbnail',
  //       originalname: '2024-02-17-182016.jpg',
  //       encoding: '7bit',
  //       mimetype: 'image/jpeg',
  //       destination: 'uploads/videos',
  //       filename: '1714744609700_2024-02-17-182016.jpg',
  //       path: 'uploads/videos/1714744609700_2024-02-17-182016.jpg',
  //       size: 83873
  //     }
  //   ]
  // }


  async create(data: CreateVideoDto, files) {

    console.log(files);

    let vd_path = files.video[0].path;
    let thumbnail_path = files.thumbnail[0].path;

    let duration = await getVideoDuration(vd_path);

    let season = data.season || null;
    let episode = data.episode || null;

    const video = await Video.create({
      video_path: vd_path,
      thumbnail: thumbnail_path,
      releaseDate: data.releaseDate,
      season: season,
      episode: episode,
      duration: duration,
      status: 'upload',
    });

    // this.rabbitClient.emit('video', data)

    return { videoId: video.id };

  }



  async createMetadata(id: number, data: CreateMetaDataDto, file) {

    const video = await Video.findByPk(id);
    let fl = file.photo[0].path;
    if (!video) {

      throw new NotFoundException();
    }
    if (video.metaDataId) {
      throw new ForbiddenException();
    }


    const metaData = await Metadata.create({
      title: data.title,
      description: data.description,
      photo: fl,
      age_restriction: data.age_restriction,
      premium: data.premium,
      categoryId: data.categoryId
    });

    await video.update({ metaDataId: metaData.id })

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

    return;

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
