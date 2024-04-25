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
    @Column({ type: DataType.BIGINT })
    id!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column(DataType.STRING)
    description: string;

    @Column({ type: DataType.STRING, allowNull: false })
    duration: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    price: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    device_count: number
}