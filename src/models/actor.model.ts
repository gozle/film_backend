import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    BelongsToMany,
} from 'sequelize-typescript';
import { ActorVideo } from './actorVideo.model';
import { Metadata } from './metadata.mode';

@Table
export class Actor extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    avatar: string;

    @BelongsToMany(() => Metadata, () => ActorVideo)
    metadata: Metadata[]

}