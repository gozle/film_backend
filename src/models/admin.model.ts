import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    DataType,
    BelongsToMany,
} from 'sequelize-typescript';

@Table
export class Admin extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    email: string;

    @Column({ type: DataType.STRING, allowNull: false })
    username: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @Column({ type: DataType.STRING, allowNull: false })
    degree: string;

}