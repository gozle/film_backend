import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
} from 'sequelize-typescript';


@Table
export class PremiumPlan extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    description: string;

    @Column({ type: DataType.STRING, allowNull: false })
    duration: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    price: number;

}