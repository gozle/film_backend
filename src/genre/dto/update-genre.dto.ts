import { PartialType } from '@nestjs/swagger';
import { CreateGenreDto } from './create-genre.dto';
import { IsAlphanumeric } from 'class-validator';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {

    @IsAlphanumeric()
    name: string


}
