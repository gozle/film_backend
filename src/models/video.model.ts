import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    HasMany,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';

import { Subtitle } from './subtitle.model';
import { Sound } from './sound.model';
import { Rating } from './rating.model';
import { Metadata } from './metadata.mode';


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

    @Column({ type: DataType.DATEONLY, allowNull: false })
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

    @HasMany(() => Rating)
    ratings: Rating[];

    @BelongsTo(() => Metadata)
    metaData: Metadata;

    @ForeignKey(() => Metadata)
    @Column({ type: DataType.BIGINT })
    metaDataId: number;

}