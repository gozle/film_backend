import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    BelongsTo,
    DataType,
    ForeignKey,
} from 'sequelize-typescript';
import { Language } from './language.model';


@Table
export class Translations extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Column(DataType.STRING)
    object_type: string;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.TEXT)
    text: string;

    @Column(DataType.STRING)
    path: string;

    @Column(DataType.STRING)
    object_id: string;

    @ForeignKey(() => Language)
    @Column({ type: DataType.BIGINT, allowNull: false })
    languageId: number;

    @BelongsTo(() => Language)
    language: Language;
}