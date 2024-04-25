import { PartialType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {

    id!: number;

    name: string;

    username: string;

    passowrd: string;

    degree: string;


}
