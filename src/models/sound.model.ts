import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    Unique,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Video } from './video.model';


@Table
export class Sound extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Column(DataType.STRING)
    language: string;

    @Column(DataType.TEXT)
    sound_path: string;

    @ForeignKey(() => Video)
    @Column(DataType.BIGINT)
    videoId: number

    @BelongsTo(() => Video)
    video: Video

}