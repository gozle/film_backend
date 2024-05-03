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
import { Metadata } from './metadata.mode';

@Table
export class GenreVideo extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @ForeignKey(() => Metadata)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    metaDataId: number;

    @ForeignKey(() => Genre)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    genreId: number;
}