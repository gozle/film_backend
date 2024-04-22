import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    HasMany,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
} from 'sequelize-typescript';
import { Video } from './video.model';
import { CountryVideo } from './coutryVideo.model';

@Table
export class Country extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column(DataType.STRING)
    name: string;

    @BelongsToMany(() => Video, () => CountryVideo)
    videos: Video[]

}