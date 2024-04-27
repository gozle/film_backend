import { ApiExtraModels } from "@nestjs/swagger";
import { Actor } from "../entities/actor.entity";

export class CreateActorDto {

    id!: number;

    name: string;
}
