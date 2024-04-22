import { PartialType } from '@nestjs/swagger';
import { CreateVideoDto } from './create-video.dto';
import { Sound } from 'src/models/sound.model';
import { Subtitle } from 'src/models/subtitle.model';
import { Genre } from 'src/models/genre.model';
import { Actor } from 'src/models/actor.model';
import { Video } from 'src/models/video.model';
import { Rating } from 'src/models/rating.model';
import { Category } from 'src/models/category.model';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {

    id!: number;

    video_path: string;

    views: number;

    thumbnail: string;

    duration: number;

    releaseDate: string;

    season: number;

    episode: number;

    status: string;

    sounds: Sound[];

    subtitles: Subtitle[];

    genres: Genre[];

    actors: Actor[]

    countries: Video[]

    ratings: Rating[];

    category: Category;

    categoryId: number;

    premium: boolean

}
