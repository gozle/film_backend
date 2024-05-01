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
import { CountryVideo } from './coutryVideo.model';

@Table
export class Country extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Unique
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @BelongsToMany(() => Video, () => CountryVideo)
    videos: Video[]

}