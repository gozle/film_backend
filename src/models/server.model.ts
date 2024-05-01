import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    HasMany,
} from 'sequelize-typescript';
import { Video } from './video.model';
import { Actor } from './actor.model';
import { Language } from './language.model';


@Table
export class Rating extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;


    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    url: string;


    @HasMany(() => Video)
    videos: Video[]

    @HasMany(() => Actor)
    actors: Actor[]

    @HasMany(() => Language)
    languages: Language[]

}