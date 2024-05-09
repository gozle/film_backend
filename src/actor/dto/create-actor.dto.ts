import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { Actor } from "../entities/actor.entity";

export class CreateActorDto {

    id!: number;

    @ApiProperty({ type: 'string' })
    name: string;

    @ApiProperty({ type: 'file' })
    avatar: string

}

