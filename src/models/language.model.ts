import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    Unique,
} from 'sequelize-typescript';


@Table
export class Language extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column(DataType.TEXT)
    photo: string;

    @Column({ type: DataType.STRING, allowNull: false })
    @Unique
    short_name: string;


    HTTP
}