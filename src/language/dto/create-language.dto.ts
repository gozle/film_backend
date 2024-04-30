import { IsAlphanumeric } from "class-validator";

export class CreateLanguageDto {

    @IsAlphanumeric()
    name: string;

    photo: string;

    @IsAlphanumeric()
    short_name: string;
}
