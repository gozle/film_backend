import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    BelongsTo,
    ForeignKey,
    Unique,
} from 'sequelize-typescript';
import { PremiumPlan } from './premiumPlans.model';



@Table
export class GiftCard extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column(DataType.BIGINT)
    id!: number;

    @Unique
    @Column({ type: DataType.STRING, allowNull: false, })
    code: string;

    // @Column(DataType.INTEGER)
    // duration: number;

    @Column({
        type: DataType.STRING,
        defaultValue: false
    })
    is_active: boolean;

    @BelongsTo(() => PremiumPlan)
    premiumPlan: PremiumPlan;

    @ForeignKey(() => PremiumPlan)
    @Column({ type: DataType.BIGINT })
    premiumId: number;

}