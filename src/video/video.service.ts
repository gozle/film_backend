import { Inject, Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from '../models/video.model'
import { Metadata } from 'src/models/metadata.mode';
import { ClientProxy } from '@nestjs/microservices';
import { getVideoDuration } from 'src/util/get-video-duration';


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

  uploadVide(file) {

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
