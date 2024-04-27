import { PartialType } from "@nestjs/swagger";
import { IsAlphanumeric, IsEnum, IsStrongPassword } from "class-validator";
import { Admin } from "src/models/admin.model";
import { AdminRole } from "../admin.constants";

export class CreateAdminDto extends PartialType(Admin) {


    @IsAlphanumeric()
    name: string;

    @IsAlphanumeric()
    username: string;

    @IsStrongPassword()
    passowrd: string;

    @IsEnum(AdminRole)
    degree: string;


}
