import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    Unique,
    BelongsToMany,
    BelongsTo,
    ForeignKey,
    HasMany,
} from 'sequelize-typescript';
import { ActorVideo } from './actorVideo.model';
import { Actor } from './actor.model';
import { GenreVideo } from './genreVideo.model';
import { Genre } from './genre.model';
import { Country } from './country.model';
import { CountryVideo } from './countryVideo.model';
import { Category } from './category.model';
import { Video } from './video.model';


@Table
export class Metadata extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Column(DataType.STRING)
    title: string;

    @Column(DataType.TEXT)
    description: string;

    @Column(DataType.STRING)
    photo: string;

    @Unique
    @Column(DataType.STRING)
    slug: string;

    @Column(DataType.STRING)
    age_restriction: string;

    @BelongsToMany(() => Actor, () => ActorVideo)
    actors: Actor[]

    @BelongsToMany(() => Genre, () => GenreVideo)
    genres: Genre[]


    @BelongsToMany(() => Country, () => CountryVideo)
    countries: Country[]

    @BelongsTo(() => Category)
    category: Category;

    @ForeignKey(() => Category)
    @Column({ type: DataType.BIGINT })
    categoryId: number;

    @Column(DataType.BOOLEAN)
    premium: boolean

    @HasMany(() => Video)
    video: Video[];


}