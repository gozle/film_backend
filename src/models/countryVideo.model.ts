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
import { Country } from './country.model';
import { Metadata } from './metadata.mode';

@Table
export class CountryVideo extends Model {

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

    @ForeignKey(() => Country)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    countryId: number;

}