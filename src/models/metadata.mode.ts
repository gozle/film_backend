import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    BelongsTo,
    DataType,
    Unique,
} from 'sequelize-typescript';


@Table
export class Metadata extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Column(DataType.STRING)
    title: string;

    @Column(DataType.TEXT)
    description: string;

    @Column(DataType.STRING)
    thumbnail: string;

    @Unique
    @Column(DataType.STRING)
    slug: string;

    @Column(DataType.STRING)
    age_restriction: string;




}