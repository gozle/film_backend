import { PartialType } from "@nestjs/swagger";
import { Admin } from "src/models/admin.model";

export class CreateAdminDto extends PartialType(Admin) {

    id!: number;


    name: string;


    username: string;


    passowrd: string;

    degree: string;


}
