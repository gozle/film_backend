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
import { GenreVideo } from './genreVideo.model';
import { Metadata } from './metadata.mode';


@Table
export class Genre extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Unique
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;


    @BelongsToMany(() => Metadata, () => GenreVideo)
    metadata: Metadata[]

}