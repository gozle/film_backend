import { IsAlphanumeric, IsString } from "class-validator";

export class CreateCategoryDto {


    @IsString()
    name: string;

    parentId: number;


}

