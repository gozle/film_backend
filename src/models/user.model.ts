import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
    Unique,
} from 'sequelize-typescript';


@Table
export class User extends Model {
    @PrimaryKey
    @Unique
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id!: number;

    @Column(DataType.STRING)
    name: string;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email: string;


    @Unique
    @Column({
        type: DataType.STRING,

    })
    phone: string;

    @Column(DataType.STRING)
    password: string;


    @Column(DataType.DATEONLY)
    birth_date: string;

    @Column({ type: DataType.ENUM("male", "female", "not specified") })
    gender: string;

    @Column({ type: DataType.BOOLEAN })
    isVerify: boolean;

}