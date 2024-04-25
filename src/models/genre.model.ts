import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    BelongsToMany,
} from 'sequelize-typescript';

import { Video } from './video.model';
import { GenreVideo } from './genreVideo.model';


@Table
export class Genre extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Column(DataType.STRING)
    name: string;


    @BelongsToMany(() => Video, () => GenreVideo)
    videos: Video[]

}