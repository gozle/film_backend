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
import { Metadata } from './metadata.mode';

@Table
export class ActorVideo extends Model {
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

    @ForeignKey(() => Actor)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    actorId: number;
}