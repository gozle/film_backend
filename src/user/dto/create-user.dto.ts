import { PartialType } from "@nestjs/swagger";
import { User } from "src/models/user.model";

export class CreateUserDto extends PartialType(User) {


    id!: number;

    name: string;

    email: string;

    phone: string;

    password: string;

    birth: string;

    gender: string;


}
