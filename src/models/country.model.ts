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
import { CountryVideo } from './countryVideo.model';
import { Metadata } from './metadata.mode';

@Table
export class Country extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Unique
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @BelongsToMany(() => Metadata, () => CountryVideo)
    metadata: Metadata[]
}