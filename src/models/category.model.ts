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

@Table
export class Category extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.BIGINT)
    parentId: number;

    @HasMany(() => Video)
    metaDatas: Video[]

}