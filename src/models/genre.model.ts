import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    BelongsToMany,
    Unique,
} from 'sequelize-typescript';

import { Video } from './video.model';
import { GenreVideo } from './genreVideo.model';


@Table
export class Genre extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Unique
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;


    @BelongsToMany(() => Video, () => GenreVideo)
    videos: Video[]

}