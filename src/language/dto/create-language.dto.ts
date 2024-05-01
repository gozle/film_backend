import { IsAlphanumeric } from "class-validator";

export class CreateLanguageDto {

    @IsAlphanumeric()
    name: string;

    icon: string;

    @IsAlphanumeric()
    short_name: string;
}
