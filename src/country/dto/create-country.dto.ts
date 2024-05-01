import { IsAlphanumeric } from "class-validator";

export class CreateCountryDto {

    @IsAlphanumeric()
    name: string;
}
