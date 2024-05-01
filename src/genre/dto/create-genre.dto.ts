import { IsAlphanumeric } from "class-validator";

export class CreateGenreDto {

    @IsAlphanumeric()
    name: string

}
