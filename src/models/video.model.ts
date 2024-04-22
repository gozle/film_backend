import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    HasMany,
    BelongsToMany,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';

import { Subtitle } from './subtitle.model';
import { Sound } from './sound.model';
import { Genre } from './genre.model';
import { GenreVideo } from './genreVideo.model';
import { ActorVideo } from './actorVideo.model';
import { Actor } from './actor.model';
import { Country } from './country.model';
import { CountryVideo } from './coutryVideo.model';
import { Rating } from './rating.model';
import { Category } from './category.model';

@Table
export class Video extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Column(DataType.STRING)
    video_path: string;

    @Column(DataType.BIGINT)
    views: number;

    @Column(DataType.STRING)
    thumbnail: string;

    @Column(DataType.FLOAT)
    duration: number;

    @Column(DataType.DATE)
    releaseDate: string;

    @Column({
        type: DataType.INTEGER,
        defaultValue: null
    })
    season: number;

    @Column(
        {
            type: DataType.INTEGER,
            defaultValue: null
        })
    episode: number;

    @Column(DataType.STRING)
    status: string;

    @HasMany(() => Sound)
    sounds: Sound[];

    @HasMany(() => Subtitle)
    subtitles: Subtitle[];

    @BelongsToMany(() => Genre, () => GenreVideo)
    genres: Genre[]

    @BelongsToMany(() => Actor, () => ActorVideo)
    actors: Actor[]

    @BelongsToMany(() => Country, () => CountryVideo)
    countries: Video[]

    @HasMany(() => Rating)
    ratings: Rating[];

    @BelongsTo(() => Category)
    category: Category;

    @ForeignKey(() => Category)
    @Column({ type: DataType.BIGINT })
    categoryId: number;

    @Column(DataType.BOOLEAN)
    premium: boolean

}