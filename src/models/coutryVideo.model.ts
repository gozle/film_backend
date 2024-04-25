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

@Table
export class CountryVideo extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @ForeignKey(() => Video)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    videoId: number;

    @ForeignKey(() => Country)
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    countryId: number;

}