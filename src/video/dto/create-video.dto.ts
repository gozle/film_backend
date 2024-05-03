import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Actor } from "src/models/actor.model";
import { Category } from "src/models/category.model";
import { Genre } from "src/models/genre.model";
import { Rating } from "src/models/rating.model";
import { Sound } from "src/models/sound.model";
import { Subtitle } from "src/models/subtitle.model";
import { Video } from "src/models/video.model";

export class CreateVideoDto extends PartialType(Video) {

    id!: number;

    @ApiProperty({ type: "file", name: "video" })
    video_path: string;

    views: number;

    @ApiProperty({ type: "file", name: "thumbnail" })
    thumbnail: string;


    duration: number;

    @ApiProperty({ type: "string", format: "date", example: '29-04-2024', description: "must be entered as shown in the example" })
    releaseDate: string;


    @ApiProperty({ required: false, description: "If it is not a series, leave it blank" })
    season: number;

    @ApiProperty({ required: false, description: "If it is not a series, leave it blank" })
    episode: number;

    status: string;

    sounds: Sound[];

    subtitles: Subtitle[];

    ratings: Rating[];

    category: Category;

    categoryId: number;

    premium: boolean



}
