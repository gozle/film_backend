import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { PremiumPlan } from './premiumPlans.model';



@Table
export class GiftCard extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column(DataType.STRING)
    code: string;

    @Column(DataType.INTEGER)
    duration: number;

    @Column({
        type: DataType.STRING,
        defaultValue: false
    })
    is_active: boolean;

    @BelongsTo(() => PremiumPlan)
    premiumPlan: number;

    @ForeignKey(() => PremiumPlan)
    @Column({ type: DataType.BIGINT })
    premiumId: number;

}