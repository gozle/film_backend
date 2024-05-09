import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    @ApiProperty()
    name: string;

    @ApiProperty()
    parentId: number;

}

