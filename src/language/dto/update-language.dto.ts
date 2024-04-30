import { PartialType } from '@nestjs/swagger';
import { CreateLanguageDto } from './create-language.dto';
import { IsAlphanumeric } from 'class-validator';

export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {
    @IsAlphanumeric()
    name: string;

    photo: string;

    @IsAlphanumeric()
    short_name: string;
}
