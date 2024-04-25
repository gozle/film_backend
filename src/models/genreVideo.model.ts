import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    DataType,

} from 'sequelize-typescript';
import { Video } from './video.model';
import { Genre } from './genre.model';

@Table
export class GenreVideo extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @ForeignKey(() => Video)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    videoId: number;

    @ForeignKey(() => Genre)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    genreId: number;
}