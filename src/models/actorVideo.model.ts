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
import { Actor } from './actor.model';

@Table
export class ActorVideo extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @ForeignKey(() => Video)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    videoId: number;

    @ForeignKey(() => Actor)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    actorId: number;
}