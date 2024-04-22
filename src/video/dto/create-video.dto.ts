import { PartialType } from "@nestjs/swagger";
import { Actor } from "src/models/actor.model";
import { Category } from "src/models/category.model";
import { Genre } from "src/models/genre.model";
import { Rating } from "src/models/rating.model";
import { Sound } from "src/models/sound.model";
import { Subtitle } from "src/models/subtitle.model";
import { Video } from "src/models/video.model";

export class CreateVideoDto extends PartialType(Video) {

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
