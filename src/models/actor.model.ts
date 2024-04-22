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
import { ActorVideo } from './actorVideo.model';

@Table
export class Actor extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column(DataType.STRING)
    name: string;

    @BelongsToMany(() => Video, () => ActorVideo)
    videos: Video[]

}