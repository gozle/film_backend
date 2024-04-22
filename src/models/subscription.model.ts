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
import { User } from './user.model';
import { PremiumPlan } from './premiumPlans.model';



@Table
export class Subscription extends Model {

    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @ForeignKey(() => User)
    @Column(DataType.BIGINT)
    userId: number;

    @ForeignKey(() => PremiumPlan)
    @Column(DataType.BIGINT)
    planId: number;

    @Column({ type: DataType.DATE })
    start_date: string;


    @Column({ type: DataType.DATE })
    end_date: string;

}