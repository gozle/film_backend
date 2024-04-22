import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Video } from './video.model';


@Table
export class Subtitle extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Column(DataType.TEXT)
    subtitle_path: string;

    @ForeignKey(() => Video)
    @Column(DataType.BIGINT)
    videoId: number

    @BelongsTo(() => Video)
    video: Video

}