import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    id!: number;

    name: string;

    email: string;

    phone: string;

    password: string;

    birth_date: string;

    gender: string;

}
